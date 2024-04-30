"use server"

import Image from "next/image";
import {getCompanies} from "@/lib/actions";
import CompanyItem from "@/components/directory/CompanyItem";

export default async function Home() {
    const companies = await getCompanies()
    return (
        <div>
            <div className="max-w-3xl mx-auto mt-24">
                <h1 className="text-3xl font-bold mb-12">UW Startup Directory</h1>
                <small>Showing {companies.length}</small>
                <div className="rounded-lg border border-gray-300">
                    {
                        companies.map(company => <CompanyItem
                            isLast={companies.indexOf(company) === companies.length - 1}
                            key={company.id} company={company}
                        />
                        )
                    }
                </div>
            </div>
        </div>
    );
}
