import Link from "next/link";

export default function CompanyItem({company, isLast}) {
    return <Link
        href={`/${company.slug}`}
        className={`py-6 px-3 w-full ${!isLast ? "border-b" : ""} border-gray-300 flex gap-3 items-center`}>
        <img alt={`${company.name} logo`} src={company.logo} className="w-16 h-16 bg-gray-200 rounded-full"/>
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
                <h1 className="font-semibold">{company.name}</h1>
                <p className="opacity-60 text-xs">
                    {company.est}
                </p>
            </div>
            <p className="text-xs opacity-80">
                {company.one_liner}
            </p>
        </div>
    </Link>
}