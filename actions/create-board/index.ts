"use server"

import { useAuth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import db from "@/lib/db"
import { revalidatePath } from "next/cache"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId } = useAuth()

    if (!userId) {
        return {
            error: "Unauthorized"
        }
    }

    const { title } = data;

    let board;
    try {
        board = await db.board.create({
            data: {
                title
            }
        })
    } catch (error) {
        return {
            error: "Failed to create."
        }
    }

    revalidatePath(`/board/${board.id}`)

    return { data: board }
}