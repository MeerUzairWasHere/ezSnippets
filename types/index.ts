import { z } from "zod";

// types
export type SnippetType = {
    _id: string,
    clerkUserId: string;
    title: string;
    code: string;
    createdAt: Date;
};

export type CreateAndEditSnippetType = z.infer<typeof createAndEditSnippetSchema>;
// Define the Tag schema using Zod


export const createAndEditSnippetSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    code: z.string().min(2, {
        message: 'Code must be at least 2 characters.',
    }),

});


