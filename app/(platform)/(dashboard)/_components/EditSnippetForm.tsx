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
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { Plus, Minus } from 'lucide-react'
import { useState, useEffect } from 'react'
import {
    getSingleSnippetsAction,
    updateSnippetAction,
} from '@/actions/snippet.actions'

type EditSnippetFormProps = {
    id: string // The snippet ID to edit
}

const EditSnippetForm = ({ id }: EditSnippetFormProps) => {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof createAndEditSnippetSchema>>({
        resolver: zodResolver(createAndEditSnippetSchema),
        defaultValues: {
            filename: '',
            language: '',
            tabs: [
                {
                    name: '',
                    code: '',
                    language: '',
                    highlightedLines: '',
                },
            ],
        },
    })

    // Fetch the snippet data when the component mounts
    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const snippet = await getSingleSnippetsAction(id)
                if (snippet) {
                    // Transform highlightedLines to a string if it's an array
                    // @ts-ignore
                    const transformedTabs = snippet.tabs.map((tab) => ({
                        ...tab,
                        highlightedLines: Array.isArray(tab.highlightedLines)
                            ? tab.highlightedLines.join(', ')
                            : tab.highlightedLines || '',
                    }))

                    form.reset({
                        //  @ts-ignore
                        filename: snippet.filename,
                        //  @ts-ignore
                        language: snippet.language,
                        tabs: transformedTabs,
                    })
                }
            } catch (error) {
                toast({ description: 'Failed to fetch snippet data' })
            }
        }

        fetchSnippet()
    }, [id, form, toast])

    async function onSubmit(
        values: z.infer<typeof createAndEditSnippetSchema>
    ) {
        try {
            setIsSubmitting(true)

            // Transform highlightedLines to an array of numbers
            const transformedValues = {
                ...values,
                tabs: values.tabs.map((tab) => ({
                    ...tab,
                    highlightedLines:
                        typeof tab.highlightedLines === 'string' &&
                        tab.highlightedLines.trim() !== ''
                            ? tab.highlightedLines
                                  .split(',')
                                  .map((num) => num.trim())
                                  .filter((num) => !isNaN(Number(num))) // Ensure only numbers
                                  .map(Number)
                            : Array.isArray(tab.highlightedLines)
                              ? tab.highlightedLines
                              : [],
                })),
            }

            // @ts-ignore
            await updateSnippetAction(id, transformedValues)

            toast({ description: 'Snippet updated successfully' })
            router.push('/snippets')
            router.refresh() // Refresh the page to show updated data
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
                highlightedLines: '',
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

    const dummyComponentCode = `e.g. 
import { useState } from 'react'
  
const DummyComponent = () => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Counter</h2>
      <p className="mb-2">Count: {count}</p>
      <button 
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
};`

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mb-5 space-y-8"
            >
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
                    name="language"
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
                                name={`tabs.${index}.highlightedLines`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Highlighted Lines</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
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
                                name={`tabs.${index}.code`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Code</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder={
                                                    index === 0
                                                        ? dummyComponentCode
                                                        : 'Enter your code here...'
                                                }
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
