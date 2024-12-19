'use server'

import connectDB from '@/lib/db'
import Snippet from '@/lib/db/models/snippet.model'
import { SnippetType, CreateAndEditSnippetType } from '@/types'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

function getUserClerkId(): string {
    const { userId } = auth()

    if (!userId) redirect('/')
    return userId
}

export const createSnippet = async (
    values: CreateAndEditSnippetType
): Promise<SnippetType | null> => {
    const clerkUserId = getUserClerkId()
    try {
        await connectDB()
        const snippet: SnippetType = await Snippet.create({
            ...values,
            clerkUserId,
            highlighLines: values?.highlightLines,
        })
        return snippet
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAllSnippetsAction = async (): Promise<SnippetType[] | null> => {
    const clerkUserId = getUserClerkId()

    try {
        await connectDB()
        const snippets = await Snippet.find({ clerkUserId }).sort({
            createdAt: 'desc',
        })
        return snippets
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getSingleSnippetsAction = async (
    snippetId: string
): Promise<SnippetType | null> => {
    const clerkUserId = getUserClerkId()

    try {
        await connectDB()
        const snippets: SnippetType | null = await Snippet.findOne({
            clerkUserId,
            _id: snippetId,
        })
        return snippets
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function updateSnippetAction(
    id: string,
    values: CreateAndEditSnippetType
): Promise<SnippetType | null> {
    const clerkUserId = getUserClerkId()

    try {
        const snippet = await Snippet.findOneAndUpdate(
            { clerkUserId, _id: id },
            values,
            {
                new: true,
                runValidators: true,
            }
        )
        return snippet
    } catch (error) {
        return null
    }
}

export const deleteSnippetAction = async (snippedId: string) => {
    const clerkUserId = getUserClerkId()
    await connectDB()
    try {
        const snippet = await Snippet.findOneAndDelete({
            _id: snippedId,
            clerkUserId,
        })
        return snippet
    } catch (error) {
        console.log(error)
        return null
    }
}
