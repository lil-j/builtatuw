"use server"
import Navbar from "@/components/Navbar";
import {ibm_plex_mono} from "@/fonts/ibm_plex_mono";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import OnboardingContainer from "@/components/onboarding/OnboardingContainer";
import {supabase} from "@/lib/supabase";
import {getColumns} from "@/lib/actions";
import SetupAccountForm from "@/components/onboarding/SetupAccountForm";

export default async function SetupAccount() {
    const columns = await getColumns('founder')

    return <div>
        <Navbar>
            <Breadcrumb className={ibm_plex_mono.className + "s cursor-default"}>
                <BreadcrumbList>
                    <BreadcrumbSeparator className="text-white"/>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-white">Setup Account</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </Navbar>

        <div className="max-w-3xl mx-auto mt-16 px-5 md:px-0">
            <h1 className="text-2xl text-black/90 font-bold mb-12">
                <span className="text-purple-500">Setup your account</span> to add your startup to the University of Washington Startup Directory.
            </h1>
            <SetupAccountForm  columns={columns}/>
        </div>
    </div>
}