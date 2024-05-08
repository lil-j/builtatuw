"use server"

import Image from "next/image";
import Link from "next/link";
import {getCompanies} from "@/lib/actions";
import CompanyItem from "@/components/directory/CompanyItem";
import Marquee from "react-fast-marquee";
import {ibm_plex_mono} from "@/fonts/ibm_plex_mono";
import { Button, buttonVariants } from "@/components/ui/button"


export default async function Home() {
    const companies = await getCompanies()
    return (
        <div className="">
            <Marquee
                autoFill
                className={ibm_plex_mono.className + " w-full py-1 bg-purple-500 text-white text-center"}
            >
                <p className="ml-2">✺ UW STARTUP DIRECTORY</p>
            </Marquee>
            <div className="max-w-3xl mx-auto mt-2 px-5 md:px-0 flex flex-row justify-end" style={{alignItems: 'center'}}>
                <p className="text-black/90 font-medium pr-2">Founder? Add your startup here</p>
                <Link className={`bg-purple-600 text-white ${buttonVariants({variant: "primary"})}`}
                      href={"/onboarding"}>Apply</Link>
            </div>
            <div className="max-w-3xl mx-auto mt-24 px-5 md:px-0">
                <h1 className="text-4xl text-black/90 font-bold mb-12">There are <span
                    className="text-purple-600">{companies.length}</span> active
                    startups at the University of Washington.</h1>


                <small>Showing {companies.length}</small>
                <div className="rounded-lg border border-gray-300 overflow-hidden">
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
