import { z } from 'zod'

// types
export type SnippetType = {
    _id: string
    clerkUserId: string
    title: string
    code: string
    createdAt: Date
    language: string
    highlightedLines?: string[]
}

export type CreateAndEditSnippetType = z.infer<
    typeof createAndEditSnippetSchema
>
// Define the Tag schema using Zod

export const createAndEditSnippetSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    code: z.string().min(2, {
        message: 'Code must be at least 2 characters.',
    }),
    language: z.string().min(1, {
        message: 'Must be a valid language.',
    }),
    highlightedLines: z
        .union([z.string(), z.array(z.string())])
        .transform((val) => (Array.isArray(val) ? val : [val])), // Ensure it's always an array of strings
})
