"use server"

import {supabase} from "@/lib/supabase";
import {auth, currentUser} from "@clerk/nextjs/server";

export async function getCompanies() {
    console.log("[actions.js] Fetching companies...");
    const {data, error} = await supabase.from('company')
        .select(`*`)
    console.log("[actions.js] Supabase query result:", { data, error });
    // TODO: Add proper error handling
    if (error) console.error("Error fetching companies:", error);
    return data
}

export async function getCompany(slug) {
    const {data, error} = await supabase.from('company')
        .select(`
        *,
        added_socials(*),
        company_founders(founder(*, added_socials(*)))
        `)
        .eq('slug', slug)
        .single()
    // TODO: Add proper error handling
    if (error) console.error(`Error fetching company ${slug}:`, error);
    return data
}

export async function getColumns(table) {
    const { data, error } = await supabase.rpc('get_columns_for_table', { sauce_table_name: table })
    // console.log(data)
    // return data
    // remove any columns that contain "Auth:" or "deprecated" in the description
    if (!Array.isArray(data)) return [];
    return data.filter(col => {
        return col.description && !col.description.includes("Auth:") && !col.description.includes("deprecated")
    })
}

export async function uploadFile(file, bucket) {
    // generate file name
    const fileName = `${file.name}-${new Date().getTime()}`
    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file)
    return data
}

export async function upsertFounder(values) {
    // Check if account is already set up
    const { userId } = auth();
    const {data: accData, error: accError} = await supabase.from("founder").select("id").eq("clerk_id", userId).single()
    // API call to set up account
    if (accData) {
        console.log("updating")
        values.id = accData.id
    }

    values.clerk_id = userId

    const {data, error } = await supabase.from('founder').upsert(values)
}

export async function getUsersFounderInfo() {
    const { userId } = auth();
    const { data, error } = await supabase.from('founder').select('*').eq('clerk_id', userId).single()
    return {data, error}
}

export async function addCompany(formData) {
    const {
        name,
        estDate,
        founders,
        oneLiner,
        description,
        url,
        logo,
        location,
        plansToRaise,
        industry,
    } = formData;
    console.log("industry: ", industry)

    let slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

    // handle duplicate slugs
    const { data: existingSlug } = await supabase.from('company').select('slug').eq('slug', slug).single();
    if (existingSlug) {
        slug = `${slug}-${Date.now()}`;
    }

    let logoUrl = null;
    if (logo) {
        const uploadResult = await uploadFile(logo, "company/logos");
        if (uploadResult && uploadResult.Key) {
            logoUrl = uploadResult.Key;
        } else {
            throw new Error("Logo upload failed");
        }
    }

    const { data: companyData, error: companyError } = await supabase
        .from("company")
        .insert([
            {
                name,
                url,
                logo: logoUrl,
                location,
                description: description,
                one_liner: oneLiner,
                plans_to_raise: plansToRaise,
                launch_date: estDate,
                slug: slug,
            },
        ])
        .select("id, slug");

    if (companyError) {
        console.error("Error inserting company data:", companyError);
        throw new Error("Failed to add company");
    }

    if (!companyData || companyData.length === 0) {
        throw new Error("Company data not found after insertion");
    }

    const companyId = companyData[0].id;
    const companySlug = companyData[0].slug;

    const { error: tagError } = await supabase
        .from("company_tags")
        .insert([
            {
                company_id: companyId,
                tag: industry,
            },
        ]);

    if (tagError) {
        console.error("Error inserting company tag:", tagError);
        throw new Error("Failed to add company tag");
    }

    for (const founder of founders) {
        const { data: founderData, error: founderError } = await supabase
            .from("founder")
            .insert([
                {
                    name: founder.name,
                    linkedin: founder.linkedin,
                },
            ])
            .select("id");

        if (founderError) {
            console.error("Error inserting founder data:", founderError);
            throw new Error("Failed to add founder");
        }

        const founderId = founderData[0].id;

        const { error: companyFounderError } = await supabase
            .from("company_founders")
            .insert([
                {
                    company: companyId,
                    founder: founderId,
                },
            ]);

        if (companyFounderError) {
            console.error(
                "Error inserting company-founder relationship:",
                companyFounderError
            );
            throw new Error("Failed to add company-founder relationship");
        }

        // Insert the founder's LinkedIn URL into the added_socials table
        const { error: socialError } = await supabase
            .from("added_socials")
            .insert([
                {
                    for_founder: founderId,
                    url: founder.linkedin,
                },
            ]);

        if (socialError) {
            console.error("Error inserting founder social link:", socialError);
            throw new Error("Failed to add founder social link");
        }
    }

    return { success: true, slug: companySlug };
}
