"use client"
import React, {useEffect, useState} from 'react';
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
import Spinner from "@/components/Spinner";
import {currentUser} from "@clerk/nextjs/server";
import {upsertFounder} from "@/lib/actions";
import {useRouter} from "next/navigation";


export function ZForm({columns}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const fileSchema = z.object({
    file: z.any().optional().refine(file => file && file.size <= 5 * 1024 * 1024, {
        message: 'File is too large. Please upload a file smaller than 5MB.',
    }),
});

    const FormSchema = z.object(
    columns.reduce((acc, column) => {
        const isFileUpload = column.description.startsWith('file');
        const isDate = column.data_type === 'date';
        const key = column.column_name;
        let value;
        if (isFileUpload) {
            value = fileSchema;
        } else if (isDate) {
            value = z.string().nonempty();
        } else {
            value = z.string().nonempty();
        }
        return { ...acc, [key]: value };
    }, {})
    );
    const form = useForm({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(values) {
        setLoading(true)
        await upsertFounder(values)
        router.push("/add-company")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {columns.map((column, index) => {
    const isFileUpload = column.description.startsWith('file');
    const isDate = column.data_type === 'date';
    const key = column.column_name;
    let value;
    if (isFileUpload) {
        value = fileSchema;
    } else if (isDate) {
        value = z.date();
    } else {
        value = z.string().nonempty();
    }

    return (
        <FormField
            key={index}
            control={form.control}
            name={key}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={"capitalize"}>{isFileUpload ? column.column_name : column.description}</FormLabel>
                    <FormControl>
                        {isFileUpload ? (
                            <Input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    field.onChange(file);
                                }}
                            />
                        ) : (
                            <Input
                                {...field}
                                placeholder={column.description}
                                type={isDate ? 'date' : 'text'}
                            />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
            );
        })}
                <Button disabled={loading} type="submit">{
                    loading ? <Spinner textColor={"white"}/> : 'Submit'

                }</Button>
            </form>
        </Form>
    )
}

export default ZForm;