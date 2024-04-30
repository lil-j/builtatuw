"use server"

import {supabase} from "@/lib/supabase";

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