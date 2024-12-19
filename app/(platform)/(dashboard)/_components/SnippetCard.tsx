'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { DeleteSnippet } from './DeleteSnippet'
import { CodeBlock } from '@/components/ui/code-block'

interface ISnippet {
    id?: string
    title: string
    code: string
    isInfo?: boolean
    language?: string
    highlightLines?: string[]
}

export const SnippetCard = ({
    id,
    title,
    language,
    code,
    isInfo = false,
    highlightLines,
}: ISnippet) => {
    if (language == undefined) {
        language = 'jsx'
    }

    if (highlightLines && highlightLines?.length > 0) {
        const numArr = highlightLines?.map((num) => Number(num))
        return (
            <CodeBlock
                id={id}
                filename={title}
                language={language}
                highlightLines={numArr}
                code={code}
                isInfoCard={true}
            />
        )
    }

}
