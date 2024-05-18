"use server"
import {ibm_plex_mono} from "@/fonts/ibm_plex_mono";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import OnboardingContainer from "@/components/onboarding/OnboardingContainer";
import {getCompanies} from "@/lib/actions";

export default async function Onboarding() {
    const companies = await getCompanies()

    return <div className="max-w-3xl mx-auto mt-24 px-5 md:px-0">
        <Breadcrumb className={ibm_plex_mono.className + " mb-6"}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Directory</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbPage>Onboarding</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-4xl text-black/90 font-bold mb-12">Join the <span
            className="text-purple-600">{companies.length}</span> active
            startups at the University of Washington.</h1>
        <OnboardingContainer />
    </div>
}