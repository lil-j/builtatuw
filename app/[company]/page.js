"use server"
import {getCompany} from "@/lib/actions";
import Tag from "@/components/company/Tag";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {ibm_plex_mono} from "@/fonts/ibm_plex_mono";
import Navbar from "@/components/Navbar";

export default async function Company({params}) {
    const company = await getCompany(params.company)
console.log(company.company_founders)
    return <div>
        <Navbar>
            <Breadcrumb className={ibm_plex_mono.className + "s cursor-default"}>
                <BreadcrumbList>
                    <BreadcrumbSeparator className="text-white"/>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-white">{company.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </Navbar>
        <div className="bg-purple-400 px-5 md:px-0 py-12">
            <div className="max-w-3xl text-white mx-auto">

                <div className="flex gap-6 items-center">
                    <img src={company.logo} alt={`${company.name} logo`}
                         className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white shadow-2xl"/>
                    <div>
                        <h1 className="text-3xl font-semibold">{company.name}</h1>
                        <p className="text-lg opacity-80">{company.one_liner}</p>
                        <a
                            href={company.url}
                            target={"_blank"}
                            className="text-xs w-fit text-white/80 underline hover:opacity-70 transition-opacity">
                            {company.url}
                        </a>
                        <div className="flex gap-3 mt-2 text-xs">
                            {/*<Tag>*/}
                            {/*    Est. {new Date(company.launch_date).getFullYear()}*/}
                            {/*</Tag>*/}
                        </div>
                    </div>
                </div>
                <hr className="border border-gray-100/10 my-6"/>
                <div>
                    <p className="mt-2 opacity-80">{company.description}</p>
                    {/*<div className="mt-2 flex flex-col gap-1">*/}
                    {/*    {*/}
                    {/*        company.added_socials.map(social =>*/}
                    {/*        <a*/}
                    {/*            href={social.url}*/}
                    {/*            target={"_blank"}*/}
                    {/*            key={social.id + "CompanySocial"}*/}
                    {/*            className="text-xs w-fit underline hover:opacity-70 transition-opacity">*/}
                    {/*            {social.url}*/}
                    {/*        </a>)*/}
                    {/*}*/}
                    {/*</div>*/}
            </div>
            </div>
            </div>
            <div>
                <div className="mt-12 max-w-3xl mx-auto">
                    <h2 className="text-xl font-semibold mb-3">Meet the Team</h2>
                    <div className="flex flex-col gap-3">
                        {
                            company.company_founders.map(({founder}) => {
                                console.log(founder)
                                    return <div
                                        className="flex gap-3"
                                        key={founder.id + "Founder"}>
                                        {/*<img src={founder.photo} alt={`${founder.name} photo`}*/}
                                        {/*     className="w-16 h-16 bg-gray-200 border-2 shadow-md border-purple-400 rounded-full"/>*/}
                                        <div>
                                            <h3 className="text-lg font-medium">{founder.name}</h3>
                                            <a href={founder.linkedin}
                                                  target={"_blank"}
                                               className="opacity-60 mt-2 text-sm">{founder.linkedin}</a>
                                            <div className="flex gap-1 mt-2">
                                                <Tag>{founder.major}</Tag>
                                                <Tag>Graduates {new Date(founder.grad_time).getFullYear()}</Tag>
                                            </div>
                                        </div>

                                    </div>
                                }
                            )
                        }
                    </div>

                </div>
        </div>
    </div>
}