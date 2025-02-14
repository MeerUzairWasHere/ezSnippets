'use server'
import connectDB from '@/lib/db'
import Snippet from '@/lib/db/models/snippet.model'
import { SnippetType, CreateAndEditSnippetType } from '@/types'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

async function getUserClerkId(): Promise<string> {
    const user = await currentUser()
    if (!user) redirect('/')
    return user.id
}

export const createSnippet = async (
    values: CreateAndEditSnippetType
): Promise<SnippetType | null> => {
    const clerkUserId = await getUserClerkId()
    try {
        await connectDB()
        const snippet: SnippetType = await Snippet.create({
            ...values,
            clerkUserId,
        })
        // @ts-ignore
        return JSON.parse(JSON.stringify(snippet))
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAllSnippetsAction = async () => {
    const clerkUserId = await getUserClerkId()
    try {
        await connectDB()
        const snippets = await Snippet.find({ clerkUserId })
            .sort({
                createdAt: 'desc',
            })
            .lean()
        return snippets
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getSingleSnippetsAction = async (snippetId: string) => {
    const clerkUserId = await getUserClerkId()

    try {
        await connectDB()
        const snippets = await Snippet.findOne({
            clerkUserId,
            _id: snippetId,
        }).lean()
        return snippets
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function updateSnippetAction(
    id: string,
    values: CreateAndEditSnippetType
) {
    const clerkUserId = await getUserClerkId()

    try {
        const snippet = await Snippet.findOneAndUpdate(
            { clerkUserId, _id: id },
            values,
            {
                new: true,
                runValidators: true,
            }
        ).lean()
        return snippet
    } catch (error) {
        return null
    }
}

export const deleteSnippetAction = async (snippedId: string) => {
    const clerkUserId = await getUserClerkId()
    await connectDB()
    try {
        const snippet = await Snippet.findOneAndDelete({
            _id: snippedId,
            clerkUserId,
        }).lean()
        return snippet
    } catch (error) {
        console.log(error)
        return null
    }
}
