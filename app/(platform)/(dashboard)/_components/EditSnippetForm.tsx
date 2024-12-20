'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import {
    getSingleSnippetsAction,
    updateSnippetAction,
} from '@/actions/snippet.actions'
import { CreateAndEditSnippetType, createAndEditSnippetSchema } from '@/types'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

export const EditSnippetForm = ({ snippetId }: { snippetId: string }) => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const router = useRouter()

    const { data } = useQuery({
        queryKey: ['snippet', snippetId],
        queryFn: () => getSingleSnippetsAction(snippetId),
    })
    const { mutate, isPending } = useMutation({
        mutationFn: (values: CreateAndEditSnippetType) => {
            return updateSnippetAction(snippetId, values)
        },
        onSuccess: (data) => {
            if (!data) {
                toast({
                    description: 'there was an error',
                })
                return
            }
            toast({ description: 'Snippet updated' })
            queryClient.invalidateQueries({ queryKey: ['snippets'] })
            queryClient.invalidateQueries({ queryKey: ['snippet', snippetId] })
            router.push('/snippets')
            // form.reset();
        },
    })

    // 1. Define your form.
    const form = useForm<CreateAndEditSnippetType>({
        resolver: zodResolver(createAndEditSnippetSchema),
        defaultValues: {
            title: data?.title || '',
            code: data?.code || '',
            language: data?.language || '',
            highlightedLines: data?.highlightedLines,
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: CreateAndEditSnippetType) {
        mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-5">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>File Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. index.html, style.css, script.js"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Language</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. jsx, tsx, css"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="highlightedLines"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Highlighted Lines</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. 4, 7, 8, 9"
                                    {...field}
                                />
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
