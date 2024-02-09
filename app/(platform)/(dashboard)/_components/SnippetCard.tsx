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

interface ISnippet {
    id?: string
    title: string
    code: string
    createdAt: Date
}

export const SnippetCard = ({ id, title, code, createdAt }: ISnippet) => {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000) // Reset copied state after 3 seconds
    }
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    {title}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="sm"
                                    variant="link"
                                    onClick={copyToClipboard}
                                >
                                    {copied ? <Check /> : <Copy />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {copied ? (
                                    <p>Copied!</p>
                                ) : (
                                    <p>Copy to clipboard!</p>
                                )}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <pre className="overflow-x-scroll md:overflow-auto ">
                    <code>{code}</code>
                </pre>
            </CardContent>
            <CardFooter className="flex  ">
                <div className="g4 ml-auto flex gap-4">
                    <Button size="sm" variant="default" asChild>
                        <Link href={`/snippets/${id}`}>Edit</Link>
                    </Button>
                    <DeleteSnippet id={id || 'id'} />
                </div>
            </CardFooter>
        </Card>
    )
}
