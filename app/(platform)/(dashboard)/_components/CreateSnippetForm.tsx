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
import { createSnippet } from '@/actions/snippet.actions'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'

const CreateSnippetForm = () => {
    const router = useRouter()
    const initialValues: CreateAndEditSnippetType = {
        title: '', // Title of the snippet
        code: ``, // Code content
        language: '',
        highlightedLines: [],
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

    const dummyComponentCode = `import { useState } from 'react'
    
  const DummyComponent = () => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Fights Counter</h2>
      <p className="mb-2">Fight Club Fights Count: {count}</p>
      <button 
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
};
`

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                    placeholder={dummyComponentCode}
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
