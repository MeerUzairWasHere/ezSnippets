import { z } from "zod";

// types
export type SnippetType = {
    _id: string,
    clerkUserId: string;
    title: string;
    language: string;
    code: string;
    description?: string;
    tags?: string[];
    createdAt: Date;
};

export type CreateAndEditSnippetType = z.infer<typeof createAndEditSnippetSchema>;

//schemas
export const createAndEditSnippetSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    language: z.string().min(2, {
        message: 'Language must be at least 2 characters.',
    }),
    code: z.string().min(2, {
        message: 'Code must be at least 2 characters.',
    }),
    description: z.string().min(2, {
        message: 'Description must be at least 2 characters.',
    }).optional(),
    tags: z.string().min(2, {
        message: 'Tags must be at least 2 characters.',
    }).optional(),
});