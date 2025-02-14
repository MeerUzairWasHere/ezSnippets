import { z } from 'zod'

// types
export type SnippetType = {
    _id: string
    clerkUserId: string
    title: string
    filename: string
    createdAt: Date
    highlightedLines?: string[]
    tabs: TabType[]
}
export type TabType = {
    name: string
    code: string
    language: string
}

const TabSchema = z.object({
    name: z.string().min(1, {
        message: 'Tab name is required.',
    }),
    code: z.string().min(2, {
        message: 'Code must be at least 2 characters.',
    }),
    language: z.string().min(1, {
        message: 'Must be a valid language.',
    }),
})

export const createAndEditSnippetSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    filename: z.string().min(2, {
        message: 'Filename must be at least 2 characters.',
    }),
    highlightedLines: z
        .union([z.string(), z.array(z.string())])
        .transform((val) => (Array.isArray(val) ? val : [val])),
    tabs: z.array(TabSchema).min(1, {
        message: 'At least one tab is required.',
    }),
})

export type CreateAndEditSnippetType = z.infer<
    typeof createAndEditSnippetSchema
>
