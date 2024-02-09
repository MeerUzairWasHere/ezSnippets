'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    createAndEditSnippetSchema,
    SnippetType,
    CreateAndEditSnippetType,
} from '@/types'
import { Tag, TagInput } from '@/components/ui/tag-input'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { createSnippet } from '@/actions/snippet.actions'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'

const CreateSnippetForm = () => {
    const router = useRouter()
    const initialValues: CreateAndEditSnippetType = {
        title: '', // Title of the snippet
        code: ``, // Code content
    }

    const form = useForm<z.infer<typeof createAndEditSnippetSchema>>({
        resolver: zodResolver(createAndEditSnippetSchema),
        defaultValues: initialValues,
    })
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const { mutate, isPending } = useMutation({
        mutationFn: (values: CreateAndEditSnippetType) => createSnippet(values),
        onSuccess: (data) => {
            if (!data) {
                toast({ description: 'there was an error' })
                return
            }
            toast({ description: 'Snippet created' })
            queryClient.invalidateQueries({ queryKey: ['snippets'] })
            router.push('/snippets')
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof createAndEditSnippetSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // await createSnippet(values)
        mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Your code goes here"
                                    rows={14}
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={isPending} type="submit">
                    {isPending ? 'Submitting...' : 'Submit'}
                </Button>
            </form>
        </Form>
    )
}
export default CreateSnippetForm
