import Link from "next/link";
import Tag from "@/components/company/Tag";

export default function CompanyItem({company, isLast}) {
    return <Link
        href={`/${company.slug}`}
        className={`py-6 px-3 w-full ${!isLast ? "border-b" : ""} hover:bg-gray-100 active:bg-gray-200 transition-all border-gray-300 flex gap-3 items-center`}>
        <img
    alt={`${company.name} logo`}
    src={company.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&size=64&background=random`}
    className="w-16 h-16 bg-gray-200 rounded-full"
/>
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
                <h1 className="font-semibold">{company.name}</h1>
                <Tag>
                    Est. {new Date(company.launch_date).getFullYear()}
                </Tag>
            </div>
            <p className="text-xs opacity-80">
                {company.one_liner}
            </p>
        </div>
    </Link>
}