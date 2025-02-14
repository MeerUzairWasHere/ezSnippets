import { z } from 'zod'

// types
export type SnippetType = {
    _id: string
    clerkUserId: string
    filename: string
    language: string
    createdAt: Date
    tabs: TabType[]
    __v?: number
}
export type TabType = {
    name: string
    code: string
    language: string
    _id?: any
    highlightedLines?: number[]
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
    highlightedLines: z.optional(z.string() || z.number()),
})

export const createAndEditSnippetSchema = z.object({
    filename: z.string().min(2, {
        message: 'Filename must be at least 2 characters.',
    }),
    language: z.string().min(2, {
        message: 'Language must be at least 2 characters.',
    }),
    tabs: z.array(TabSchema).min(1, {
        message: 'At least one tab is required.',
    }),
})

export type CreateAndEditSnippetType = z.infer<
    typeof createAndEditSnippetSchema
>
