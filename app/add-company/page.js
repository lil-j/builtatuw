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
import {getCompanies, getUsersFounderInfo} from "@/lib/actions";
import Navbar from "@/components/Navbar";
import {auth, currentUser} from '@clerk/nextjs/server';
import {redirect} from "next/navigation";
import {supabase} from "@/lib/supabase";

export default async function Onboarding() {
    const companies = await getCompanies()

    // check if user has setup account
    const { userId } = auth();
    console.log(userId)
    const {data: setupAccount, error} = await getUsersFounderInfo()
    console.log(setupAccount, error, "Fucker")
    if (!setupAccount) {
        redirect("/setup-account")
    }

    return <div>

            <Breadcrumb className={ibm_plex_mono.className + "s cursor-default"}>
                <BreadcrumbList>
                    <BreadcrumbSeparator className="text-white"/>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-white">Add Company</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        <div className="max-w-3xl mx-auto mt-16 px-5 md:px-0">
        <h1 className="text-2xl text-black/90 font-bold mb-12">Join the <span
            className="text-purple-600">{companies.length}</span> active
            startups at the University of Washington.</h1>
        <OnboardingContainer />
        </div>
    </div>
}