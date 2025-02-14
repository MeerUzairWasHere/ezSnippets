'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createAndEditSnippetSchema, CreateAndEditSnippetType } from '@/types'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    getSingleSnippetsAction,
    updateSnippetAction,
} from '@/actions/snippet.actions'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { Plus, Minus } from 'lucide-react'
import { useState, useEffect } from 'react'

const EditSnippetForm = ({ snippetId }: { snippetId: string }) => {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof createAndEditSnippetSchema>>({
        resolver: zodResolver(createAndEditSnippetSchema),
        defaultValues: {
            title: '',
            filename: '',
            highlightedLines: [],
            tabs: [
                {
                    name: '',
                    code: '',
                    language: '',
                },
            ],
        },
    })

    useEffect(() => {
        const loadSnippet = async () => {
            try {
                const data = await getSingleSnippetsAction(snippetId)
                if (data) {
                    form.reset({
                        title: data.title,
                        filename: data.filename,
                        highlightedLines: data.highlightedLines,
                        tabs: data.tabs || [
                            {
                                name: '',
                                code: '',
                                language: '',
                            },
                        ],
                    })
                }
            } catch (error) {
                toast({ description: 'Error loading snippet' })
            } finally {
                setIsLoading(false)
            }
        }

        loadSnippet()
    }, [snippetId, form, toast])

    async function onSubmit(
        values: z.infer<typeof createAndEditSnippetSchema>
    ) {
        try {
            setIsSubmitting(true)
            const data = await updateSnippetAction(snippetId, values)

            if (!data) {
                toast({ description: 'There was an error' })
                return
            }

            toast({ description: 'Snippet updated' })
            router.push('/snippets')
            router.refresh()
        } catch (error) {
            toast({ description: 'Something went wrong' })
        } finally {
            setIsSubmitting(false)
        }
    }

    const addTab = () => {
        const currentTabs = form.getValues('tabs')
        form.setValue('tabs', [
            ...currentTabs,
            {
                name: '',
                code: '',
                language: '',
            },
        ])
    }

    const removeTab = (index: number) => {
        const currentTabs = form.getValues('tabs')
        if (currentTabs.length > 1) {
            form.setValue(
                'tabs',
                currentTabs.filter((_, i) => i !== index)
            )
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mb-5 space-y-8"
            >
                {/* Form fields remain the same as CreateSnippetForm */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. React Counter Component"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="filename"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Filename</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. React Counter Component"
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

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Tabs</h3>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addTab}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Tab
                        </Button>
                    </div>

                    {form.watch('tabs').map((_, index) => (
                        <div
                            key={index}
                            className="space-y-4 rounded-lg border p-4"
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium">Tab {index + 1}</h4>
                                {index > 0 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeTab(index)}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>

                            <FormField
                                control={form.control}
                                name={`tabs.${index}.name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tab Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. JavaScript"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`tabs.${index}.language`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Language</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. javascript"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`tabs.${index}.code`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Code</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter your code here..."
                                                rows={14}
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}
                </div>

                <Button disabled={isSubmitting} type="submit">
                    {isSubmitting ? 'Updating...' : 'Update Snippet'}
                </Button>
            </form>
        </Form>
    )
}

export default EditSnippetForm
