"use client"

import Marquee from "react-fast-marquee";
import {ibm_plex_mono} from "@/fonts/ibm_plex_mono";

import Tag from "@/components/company/Tag";
import {OnboardingForm} from "@/components/onboarding/OnboardingForm";
import {useState} from "react";

export default function OnboardingContainer() {
    const [name, setName] = useState("Your startup name");
    const [estDate, setEstDate] = useState(null);
    const [founders, setFounders] = useState("Your Name(s) here");
    const [oneLiner, setOneLiner] = useState("A brief description of your startup");
    const [description, setDescription] = useState("A less-brief description of your startup. Lorum Ipsum");
    const [industry, setIndustry] = useState(null);
    const [uploadedLogo, setUploadedLogo] = useState(null);

    // for tagging system. design isn't done yet but this will automatically change the Industry and subsection on the preview card after selection
    const industryOptions = [
        {
            value: "analytics",
            label: "Analytics",
            group: "B2B",
        },
        {
            value: "engineering-product-design",
            label: "Engineering, Product and Design",
            group: "B2B",
        },
        {
            value: "finance-accounting",
            label: "Finance and Accounting",
            group: "B2B",
        },
        {
            value: "human-resources",
            label: "Human Resources",
            group: "B2B",
        },
        {
            value: "infrastructure",
            label: "Infrastructure",
            group: "B2B",
        },
        {
            value: "legal",
            label: "Legal",
            group: "B2B",
        },
        {
            value: "marketing",
            label: "Marketing",
            group: "B2B",
        },
        {
            value: "office-management",
            label: "Office Management",
            group: "B2B",
        },
        {
            value: "operations",
            label: "Operations",
            group: "B2B",
        },
        {
            value: "productivity",
            label: "Productivity",
            group: "B2B",
        },
        {
            value: "recruiting-talent",
            label: "Recruiting and Talent",
            group: "B2B",
        },
        {
            value: "retail",
            label: "Retail",
            group: "B2B",
        },
        {
            value: "sales",
            label: "Sales",
            group: "B2B",
        },
        {
            value: "security",
            label: "Security",
            group: "B2B",
        },
        {
            value: "supply-chain-logistics",
            label: "Supply Chain and Logistics",
            group: "B2B",
        },
        {
            value: "education",
            label: "Education",
            group: "Education",
        },
        {
            value: "asset-management",
            label: "Asset Management",
            group: "Fintech",
        },
        {
            value: "banking-exchange",
            label: "Banking and Exchange",
            group: "Fintech",
        },
        {
            value: "consumer-finance",
            label: "Consumer Finance",
            group: "Fintech",
        },
        {
            value: "credit-lending",
            label: "Credit and Lending",
            group: "Fintech",
        },
        {
            value: "insurance",
            label: "Insurance",
            group: "Fintech",
        },
        {
            value: "payments",
            label: "Payments",
            group: "Fintech",
        },
        {
            value: "apparel-cosmetics",
            label: "Apparel and Cosmetics",
            group: "Consumer",
        },
        {
            value: "consumer-electronics",
            label: "Consumer Electronics",
            group: "Consumer",
        },
        {
            value: "content",
            label: "Content",
            group: "Consumer",
        },
        {
            value: "food-beverage",
            label: "Food and Beverage",
            group: "Consumer",
        },
        {
            value: "gaming",
            label: "Gaming",
            group: "Consumer",
        },
        {
            value: "home-personal",
            label: "Home and Personal",
            group: "Consumer",
        },
        {
            value: "job-career-services",
            label: "Job and Career Services",
            group: "Consumer",
        },
        {
            value: "social",
            label: "Social",
            group: "Consumer",
        },
        {
            value: "transportation-services",
            label: "Transportation Services",
            group: "Consumer",
        },
        {
            value: "travel-leisure-tourism",
            label: "Travel, Leisure and Tourism",
            group: "Consumer",
        },
        {
            value: "virtual-augmented-reality",
            label: "Virtual and Augmented Reality",
            group: "Consumer",
        },
        {
            value: "consumer-health-wellness",
            label: "Consumer Health and Wellness",
            group: "Healthcare",
        },
        {
            value: "diagnostics",
            label: "Diagnostics",
            group: "Healthcare",
        },
        {
            value: "drug-discovery-delivery",
            label: "Drug Discovery and Delivery",
            group: "Healthcare",
        },
        {
            value: "healthcare-it",
            label: "Healthcare IT",
            group: "Healthcare",
        },
        {
            value: "healthcare-services",
            label: "Healthcare Services",
            group: "Healthcare",
        },
        {
            value: "industrial-bio",
            label: "Industrial Bio",
            group: "Healthcare",
        },
        {
            value: "medical-devices",
            label: "Medical Devices",
            group: "Healthcare",
        },
        {
            value: "therapeutics",
            label: "Therapeutics",
            group: "Healthcare",
        },
        {
            value: "construction",
            label: "Construction",
            group: "Real Estate and Construction",
        },
        {
            value: "housing-real-estate",
            label: "Housing and Real Estate",
            group: "Real Estate and Construction",
        },
        {
            value: "agriculture",
            label: "Agriculture",
            group: "Industrials",
        },
        {
            value: "automotive",
            label: "Automotive",
            group: "Industrials",
        },
        {
            value: "aviation-space",
            label: "Aviation and Space",
            group: "Industrials",
        },
        {
            value: "climate",
            label: "Climate",
            group: "Industrials",
        },
        {
            value: "drones",
            label: "Drones",
            group: "Industrials",
        },
        {
            value: "energy",
            label: "Energy",
            group: "Industrials",
        },
        {
            value: "manufacturing-robotics",
            label: "Manufacturing and Robotics",
            group: "Industrials",
        },
        {
            value: "government",
            label: "Government",
            group: "Government",
        },
        {
            value: "unspecified",
            label: "Unspecified",
            group: "Other",
        },
    ];
    const selectedIndustry = industryOptions.find((option) => option.value === industry); // for tagging system


    return (
        <div className="">
            <div>
                <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">Preview</p>

                <div className="rounded-lg border border-gray-300 overflow-hidden mb-4">
                    <div
                        className="py-6 px-3 w-full hover:bg-gray-100 active:bg-gray-200 transition-all border-gray-300 flex gap-3 items-center">
                        {uploadedLogo ? (
                            <img
                                alt={`${name} logo`}
                                src={URL.createObjectURL(uploadedLogo)}
                                className="w-16 h-16 bg-gray-200 rounded-full"
                            />
                        ) : (
                            <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"/>
                        )}
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <h1 className="font-semibold">{name}</h1>
                                <Tag>Est. {estDate}</Tag>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-xs opacity-80">{oneLiner}</p>
                                <div className="pl-1 flex gap-2">
                                    {selectedIndustry ? (
                                        <>
                                            <Tag>{selectedIndustry.group}</Tag>
                                            <Tag>{selectedIndustry.label}</Tag>
                                        </>
                                    ) : (
                                        <>
                                            {/*this looks like shit rn*/}
                                            <Tag>Industry</Tag>
                                            <Tag>Category</Tag>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <OnboardingForm
                    name={name}
                    setName={setName}
                    estDate={estDate}
                    setEstDate={setEstDate}
                    founders={founders}
                    setFounders={setFounders}
                    oneLiner={oneLiner}
                    setOneLiner={setOneLiner}
                    description={description}
                    setDescription={setDescription}
                    industry={industry}
                    setIndustry={setIndustry}
                    logo={uploadedLogo}
                    setLogo={setUploadedLogo}
                />

            </div>
        </div>
    )
}