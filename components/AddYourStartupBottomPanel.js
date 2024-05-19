"use client"
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

export default function AddYourStartupBottomPanel() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        if (pathname === "/setup-account" || pathname === "/add-company") {
            setIsOpen(false)
        } else {
            if (!isOpen) setIsOpen(true)
        }
    }, [pathname]);

    return <AnimatePresence>
        {
            isOpen && <motion.div
                initial={{y: 100}}
                animate={{y: 0}}
                exit={{y: 100, transition: {duration: 0.5, type: "spring", bounce: 0.2}}}
                transition={{type: "spring", duration: 1, bounce: 0.2, delay: 0.75}}
                className="fixed bottom-4 left-0 z-50 w-full ">
                <div
                    className="max-w-3xl bg-white/70 backdrop-blur-md mx-5 md:mx-auto rounded-tl-xl rounded-xl shadow-xl px-8 py-4 border-2 border-gray-100">
                    <div className="px-5 md:px-0 flex justify-between items-center">
                        <p className="font-medium">Working on something? Add your startup in <span
                            className="text-purple-400">3 minutes.</span></p>
                        <Link href="/add-company"
                              className="bg-black/80 font-medium text-sm text-center whitespace-nowrap text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Add
                            your startup</Link>
                    </div>

                </div>
            </motion.div>
        }
    </AnimatePresence>
}