"use client"
import {usePathname} from "next/navigation";
import Link from "next/link";
import {ibm_plex_mono} from "@/fonts/ibm_plex_mono";

export default function Navbar({children}) {
    const pathname = usePathname()
    return <div className=" h-[50px]">
        <div className="bg-purple-500 text-white flex items-center h-full justify-between px-5 mx-auto">
            <div className="flex gap-2">
                <Link
                    className={ibm_plex_mono.className + "s  font-semibold text-sm " + `${pathname === "/" ? "cursor-default" : "cursor-pointer hover:underline"}`}
                    href={"/"}>
                    Startups Built at the University of Washington
                </Link>
                {children}
            </div>

            <Link className="text-sm" href="/">

            </Link>
        </div>
    </div>
}