"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ibm_plex_mono } from "@/fonts/ibm_plex_mono";

export default function Navbar({ children }) {
    const pathname = usePathname()

    // Helper function for link classes
    const getLinkClass = (href) => {
        const baseClass = "text-sm hover:underline";
        const activeClass = "text-sm font-semibold cursor-default"; // Style for active link
        return pathname === href ? activeClass : baseClass;
    };

    return (
        <div className="h-[50px] sticky top-0 z-50 bg-purple-500"> {/* Make navbar sticky */}
            <div className="text-white flex items-center h-full justify-between px-5 mx-auto max-w-screen-xl"> {/* Constrain width */}
                {/* Left Side - Title and potentially children */}
                <div className="flex items-center gap-4"> {/* Increased gap */}
                    <Link
                        className={`${ibm_plex_mono.className} font-semibold text-lg ${pathname === "/" ? "cursor-default" : "cursor-pointer hover:underline"}`}
                        href={"/"}>
                        Built @ UW
                    </Link>
                    {children}
                </div>

                {/* Right Side - Navigation Links */}
                <div className="flex gap-4">
                    <Link className={getLinkClass("/")} href="/">
                        Startups
                    </Link>
                    <Link className={getLinkClass("/onboarding")} href="/onboarding">
                        Add Company
                    </Link>
                     <Link className={getLinkClass("/about")} href="/about">
                        About
                    </Link>
                </div>
            </div>
        </div>
    )
}