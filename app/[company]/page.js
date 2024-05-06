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

export default async function Company({params}) {
    const company = await getCompany(params.company)

    return <div>
        <div className="max-w-3xl mx-auto md:mt-24 mt-12 px-5 md:px-0">
            <Breadcrumb className={ibm_plex_mono.className + " mb-6"}>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Directory</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>{company.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex gap-6 items-center">
                <img src={company.logo} alt={`${company.name} logo`} className="w-24 h-24 bg-gray-200 rounded-full"/>
                <div>
                    <h1 className="text-3xl font-semibold">{company.name}</h1>
                    <p className="text-lg opacity-60">{company.one_liner}</p>
                    <div className="flex gap-3 mt-2 text-xs">
                        <Tag>
                            Est. {company.est}
                        </Tag>
                    </div>
                </div>
            </div>
            <hr className="border border-gray-300 my-6"/>
            <div>
                <p className="mt-2 opacity-80">{company.description}</p>
                <div className="mt-2 flex flex-col gap-1">
                    <a
                        href={company.url}
                        target={"_blank"}
                        className="text-blue-400 text-xs w-fit underline hover:opacity-70 transition-opacity">
                        {company.url}
                    </a>
                    {
                        company.added_socials.map(social =>
                            <a
                                href={social.url}
                                target={"_blank"}
                                key={social.id + "CompanySocial"}
                                className="text-xs text-blue-400 w-fit underline hover:opacity-70 transition-opacity">
                                {social.url}
                            </a>)
                    }
                </div>
                <div className="mt-12">
                    <h2 className="text-xl font-semibold mb-3">Team</h2>
                    <div className="flex flex-col gap-3">
                        {
                            company.company_founders.map(({founder}) => <div
                                    className="flex gap-3"
                                    key={founder.id + "Founder"}>
                                    <img src={founder.photo} alt={`${founder.name} photo`}
                                         className="w-16 h-16 bg-gray-200 rounded-full"/>
                                    <div>
                                        <h3 className="text-lg font-medium">{founder.name}</h3>
                                        <div className="flex gap-1 mt-1">
                                            <Tag>{founder.major}</Tag>
                                            <Tag>Graduates {founder.grad_year}</Tag>
                                        </div>
                                        <p className="opacity-60 mt-2">{founder.bio}</p>
                                    </div>

                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    </div>
}