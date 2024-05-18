"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    estDate: z.string().regex(/^\d{4}$/, {
        message: "Please select a valid year.",
    }),
    founders: z.string().min(2, {
        message: "Please enter the founder(s) name(s).",
    }),
    oneLiner: z.string().min(2, {
        message: "Please provide a brief description.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    industry: z.string({
        required_error: "Please select an industry.",
    }),
})

export function OnboardingForm({
                                   name,
                                   setName,
                                   estDate,
                                   setEstDate,
                                   founders,
                                   setFounders,
                                   oneLiner,
                                   setOneLiner,
                                   description,
                                   setDescription,
                                   industry,
                                   setIndustry,
                                   logo,
                                   setLogo,
                               }) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            estDate: "",
            founders: "",
            oneLiner: "",
            description: "",
            industry: "",
        },
    })

    function onSubmit(values) {
        // Submit the form values
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Your startup name"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setName(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="estDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Est. Date</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    setEstDate(value);
                                }}
                                defaultValue={estDate}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a year" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                        <SelectItem key={year} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="founders"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Founder(s)</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Founder(s)"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setFounders(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="oneLiner"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>One-liner</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="A brief description of your startup"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setOneLiner(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="A description of your startup"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setDescription(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <Select
                                onValueChange={(value) => setIndustry(value)}
                                defaultValue={industry}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an industry" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {/*<SelectGroup>*/}
                                    {/*    <SelectLabel>All Industries</SelectLabel>*/}
                                    {/*    <SelectItem value="all">All Industries</SelectItem>*/}
                                    {/*</SelectGroup>*/}
                                    <SelectGroup>
                                        <SelectLabel>Category - B2B</SelectLabel>
                                        <SelectItem value="analytics">Analytics</SelectItem>
                                        <SelectItem value="engineering-product-design">Engineering, Product and
                                            Design</SelectItem>
                                        <SelectItem value="finance-accounting">Finance and Accounting</SelectItem>
                                        <SelectItem value="human-resources">Human Resources</SelectItem>
                                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                                        <SelectItem value="legal">Legal</SelectItem>
                                        <SelectItem value="marketing">Marketing</SelectItem>
                                        <SelectItem value="office-management">Office Management</SelectItem>
                                        <SelectItem value="operations">Operations</SelectItem>
                                        <SelectItem value="productivity">Productivity</SelectItem>
                                        <SelectItem value="recruiting-talent">Recruiting and Talent</SelectItem>
                                        <SelectItem value="retail">Retail</SelectItem>
                                        <SelectItem value="sales">Sales</SelectItem>
                                        <SelectItem value="security">Security</SelectItem>
                                        <SelectItem value="supply-chain-logistics">Supply Chain and Logistics</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Category - Education</SelectLabel>
                                        <SelectItem value="education">Education</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Category - Fintech</SelectLabel>
                                        <SelectItem value="asset-management">Asset Management</SelectItem>
                                        <SelectItem value="banking-exchange">Banking and Exchange</SelectItem>
                                        <SelectItem value="consumer-finance">Consumer Finance</SelectItem>
                                        <SelectItem value="credit-lending">Credit and Lending</SelectItem>
                                        <SelectItem value="insurance">Insurance</SelectItem>
                                        <SelectItem value="payments">Payments</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Category - Consumer</SelectLabel>
                                        <SelectItem value="apparel-cosmetics">Apparel and Cosmetics</SelectItem>
                                        <SelectItem value="consumer-electronics">Consumer Electronics</SelectItem>
                                        <SelectItem value="content">Content</SelectItem>
                                        <SelectItem value="food-beverage">Food and Beverage</SelectItem>
                                        <SelectItem value="gaming">Gaming</SelectItem>
                                        <SelectItem value="home-personal">Home and Personal</SelectItem>
                                        <SelectItem value="job-career-services">Job and Career Services</SelectItem>
                                        <SelectItem value="social">Social</SelectItem>
                                        <SelectItem value="transportation-services">Transportation Services</SelectItem>
                                        <SelectItem value="travel-leisure-tourism">Travel, Leisure and Tourism</SelectItem>
                                        <SelectItem value="virtual-augmented-reality">Virtual and Augmented Reality</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Category - Healthcare</SelectLabel>
                                        <SelectItem value="consumer-health-wellness">Consumer Health and Wellness</SelectItem>
                                        <SelectItem value="diagnostics">Diagnostics</SelectItem>
                                        <SelectItem value="drug-discovery-delivery">Drug Discovery and Delivery</SelectItem>
                                        <SelectItem value="healthcare-it">Healthcare IT</SelectItem>
                                        <SelectItem value="healthcare-services">Healthcare Services</SelectItem>
                                        <SelectItem value="industrial-bio">Industrial Bio</SelectItem>
                                        <SelectItem value="medical-devices">Medical Devices</SelectItem>
                                        <SelectItem value="therapeutics">Therapeutics</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Category - Real Estate and Construction</SelectLabel>
                                        <SelectItem value="construction">Construction</SelectItem>
                                        <SelectItem value="housing-real-estate">Housing and Real Estate</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Category - Industrials</SelectLabel>
                                        <SelectItem value="agriculture">Agriculture</SelectItem>
                                        <SelectItem value="automotive">Automotive</SelectItem>
                                        <SelectItem value="aviation-space">Aviation and Space</SelectItem>
                                        <SelectItem value="climate">Climate</SelectItem>
                                        <SelectItem value="drones">Drones</SelectItem>
                                        <SelectItem value="energy">Energy</SelectItem>
                                        <SelectItem value="manufacturing-robotics">Manufacturing and Robotics</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Category - Government</SelectLabel>
                                        <SelectItem value="government">Government</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Category - Other</SelectLabel>
                                        <SelectItem value="unspecified">Unspecified</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Logo</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        field.onChange(file);
                                        setLogo(file);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}