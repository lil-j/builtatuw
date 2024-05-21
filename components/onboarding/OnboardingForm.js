"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {useFieldArray, useForm} from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { format } from "date-fns";

import { Button } from "@/components/ui/button"
import { CalendarIcon, Trash2 } from "lucide-react"
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

import { Separator } from "@/components/ui/separator"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {useRouter} from "next/navigation";
import {addCompany} from "@/lib/actions";
import {Checkbox} from "@/components/ui/checkbox";

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    estDate: z.date({
        required_error: "Please select a valid date.",
    }),
    oneLiner: z.string().min(2, {
        message: "Please provide a brief one-line description.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    industry: z.string({
        required_error: "Please select an industry.",
    }),
    url: z.string().url({
        message: "Please enter a valid URL.",
    }),
    location: z.string().min(2, {
        message: "Location must be at least 2 characters.",
    }),
    founders: z.array(z.object({
        name: z.string().min(2, {
            message: "Please enter the co-founder's name.",
        }),
        linkedin: z.string().url({
            message: "Please enter a valid LinkedIn URL.",
        }).optional()
    })),
    plansToRaise: z.boolean().optional()
});



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
                                   url,
                                   setUrl,
                                   location,
                                   setLocation,
                                   plansToRaise,
                                   setPlansToRaise
                               }) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            estDate: "",
            oneLiner: "",
            description: "",
            url: "",
            industry: "",
            founders: [{ name: "", linkedin: "" }],
            plansToRaise: false
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "founders"
    });

    const router = useRouter();

    async function onSubmit(formData) {
        console.log(formData)
        try {
            const response = await addCompany(formData);
            if (response.success) {
                // Company added successfully
                router.push(`/${response.slug}`);
            } else {
                console.error('Error adding company');
            }
        } catch (error) {
            console.error('Error adding company:', error);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
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
                            <FormDescription>
                                This is your public Startup name.
                            </FormDescription>

                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="estDate"
                    render={({field}) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Est. Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => {
                                            field.onChange(date);
                                            setEstDate(format(date, "PPP"));
                                        }}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                The date that you founded your startup.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                    <div className="space-y-2">
                        <FormLabel>Co-founders</FormLabel>
                        {fields.map((field, index) => (
                            <div key={field.id} className="space-x-1 flex flex-row">
                                <div className="w-[50%]">
                                    <FormField
                                        control={form.control}
                                        name={`founders.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Co-founder name"
                                                        onBlur={() => {
                                                            if (index === fields.length - 1 && field.value) {
                                                                append({ name: "", linkedin: "" });
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Separator orientation="vertical" />
                                <div className="w-[50%]">
                                    <FormField
                                        control={form.control}
                                        name={`founders.${index}.linkedin`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="LinkedIn URL"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {fields.length > 1 && (
                                    <Button type="button" onClick={() => remove(index)}>
                                        <Trash2 />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>


                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name="founders"*/}
                {/*    render={({ field }) => (*/}
                {/*        <FormItem>*/}
                {/*            <FormLabel>Founder(s)</FormLabel>*/}
                {/*            <FormControl>*/}
                {/*                <Input*/}
                {/*                    {...field}*/}
                {/*                    placeholder="Founder(s)"*/}
                {/*                    onChange={(e) => {*/}
                {/*                        field.onChange(e);*/}
                {/*                        setFounders(e.target.value);*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            </FormControl>*/}
                {/*            <FormDescription>*/}
                {/*                List all founders involved.*/}
                {/*            </FormDescription>*/}

                {/*            <FormMessage />*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}

                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name="linkedin"*/}
                {/*    render={({ field }) => (*/}
                {/*        <FormItem>*/}
                {/*            <FormLabel>LinkedIn</FormLabel>*/}
                {/*            <FormControl>*/}
                {/*                <Input*/}
                {/*                    {...field}*/}
                {/*                    placeholder="linkedin.com/in/your-username/"*/}
                {/*                    onChange={(e) => {*/}
                {/*                        field.onChange(e);*/}
                {/*                        setLinkedin(e.target.value);*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            </FormControl>*/}
                {/*            <FormDescription>*/}
                {/*                Add LinkedIn profile URL for each founder.*/}
                {/*            </FormDescription>*/}

                {/*            <FormMessage />*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}
                <FormField
                    control={form.control}
                    name="oneLiner"
                    render={({field}) => (
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
                            <FormDescription>
                                Add a saying or quote that you can relate to.
                            </FormDescription>

                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
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
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="url"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Website URL</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="https://yourstartup.com"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setUrl(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Location of your startup"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setLocation(e.target.value);
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
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    setIndustry(value);
                                }}
                                defaultValue={industry}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an industry"/>
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
                                        <SelectItem value="supply-chain-logistics">Supply Chain and
                                            Logistics</SelectItem>
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
                                        <SelectItem value="travel-leisure-tourism">Travel, Leisure and
                                            Tourism</SelectItem>
                                        <SelectItem value="virtual-augmented-reality">Virtual and Augmented
                                            Reality</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Category - Healthcare</SelectLabel>
                                        <SelectItem value="consumer-health-wellness">Consumer Health and
                                            Wellness</SelectItem>
                                        <SelectItem value="diagnostics">Diagnostics</SelectItem>
                                        <SelectItem value="drug-discovery-delivery">Drug Discovery and
                                            Delivery</SelectItem>
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
                                        <SelectItem value="manufacturing-robotics">Manufacturing and
                                            Robotics</SelectItem>
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
                            <FormMessage/>
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

                <FormField
                    control={form.control}
                    name="plansToRaise"
                    render={({field}) => (
                        <FormItem
                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Plans to Raise Funds
                                </FormLabel>
                                <FormDescription>
                                    Indicate if your startup plans to raise funds.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}