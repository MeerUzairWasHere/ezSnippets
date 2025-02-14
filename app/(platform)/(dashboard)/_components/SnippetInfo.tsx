'use client'

import { useState, useEffect } from 'react'
import { getSingleSnippetsAction } from '@/actions/snippet.actions'
import { CreateAndEditSnippetType } from '@/types'
import { useToast } from '@/components/ui/use-toast'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'
import { DeleteSnippet } from './DeleteSnippet'

interface CodeBlockProps {
    code: string
    language: string
    highlightedLines?: string[]
}

const CodeBlock = ({ code, language, highlightedLines }: CodeBlockProps) => {
    return (
        <pre className="relative rounded-lg bg-gray-900 p-4">
            <code className={`language-${language}`}>{code}</code>
        </pre>
    )
}

export const SnippetInfo = ({ snippetId }: { snippetId: string }) => {
    const [snippet, setSnippet] = useState<CreateAndEditSnippetType | null>(
        null
    )
    const [isLoading, setIsLoading] = useState(true)
    const { toast } = useToast()
    const router = useRouter()

    useEffect(() => {
        const loadSnippet = async () => {
            try {
                const data = await getSingleSnippetsAction(snippetId)
                if (data) {
                    setSnippet(data)
                } else {
                    toast({ description: 'Snippet not found' })
                }
            } catch (error) {
                toast({ description: 'Error loading snippet' })
            } finally {
                setIsLoading(false)
            }
        }

        loadSnippet()
    }, [snippetId, toast])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!snippet) {
        return <div>Snippet not found</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{snippet.title}</h1>
                    <p className="text-gray-500">{snippet.filename}</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            router.push(`/snippets/edit/${snippetId}`)
                        }
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                    <DeleteSnippet id={snippetId} />
                </div>
            </div>

            <Tabs
                defaultValue={snippet.tabs[0]?.name || 'tab-1'}
                className="w-full"
            >
                <TabsList>
                    {snippet.tabs.map((tab, index) => (
                        <TabsTrigger
                            key={index}
                            value={tab.name || `tab-${index + 1}`}
                        >
                            {tab.name || `Tab ${index + 1}`}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {snippet.tabs.map((tab, index) => (
                    <TabsContent
                        key={index}
                        value={tab.name || `tab-${index + 1}`}
                    >
                        <CodeBlock
                            code={tab.code}
                            language={tab.language}
                            highlightedLines={snippet.highlightedLines}
                        />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

export default SnippetInfo
