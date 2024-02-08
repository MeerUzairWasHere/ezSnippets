"use server"

import { connectDB } from "@/lib/db"
import Snippet from "@/lib/db/models/snippet.model"
import {
    SnippetType,
    CreateAndEditSnippetType,
    createAndEditSnippetSchema
} from "@/types"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

function getUserClerkId(): string {
    const { userId } = auth();

    if (!userId) redirect('/');
    return userId;
}


export const createSnippet = async (values: CreateAndEditSnippetType): Promise<SnippetType | null> => {
    const clerkUserId = getUserClerkId();

    try {
        await connectDB()
        const snippet: SnippetType = await Snippet.create({ ...values, clerkUserId })
        return snippet
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAllSnippets = async () => {
    const clerkUserId = getUserClerkId();

    try {
        await connectDB()

        const snippets = await Snippet.find({ clerkUserId }).sort({ createdAt: 'desc' });

        return snippets

    } catch (error) {
        console.log(error)
        return null
    }
} 