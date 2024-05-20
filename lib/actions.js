"use server"

import {supabase} from "@/lib/supabase";
import {auth, currentUser} from "@clerk/nextjs/server";

export async function getCompanies() {
    const {data, error} = await supabase.from('company')
        .select(`*`)
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
    return data
}

export async function getColumns(table) {
    const { data, error } = await supabase.rpc('get_columns_for_table', { sauce_table_name: table })
    // console.log(data)
    // return data
    // remove any columns that contain "Auth:" or "deprecated" in the description
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