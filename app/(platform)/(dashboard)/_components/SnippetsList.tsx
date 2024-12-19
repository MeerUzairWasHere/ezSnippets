'use client'

import { getAllSnippetsAction } from '@/actions/snippet.actions'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import DynamicCodeBlock from './Code'
import { SnippetType } from '@/types'

export const SnippetsList = () => {
    const { data, isPending } = useQuery({
        queryKey: ['snippets'],
        queryFn: () => getAllSnippetsAction(),
    })
    const snippets: SnippetType[] = JSON.parse(JSON.stringify(data)) || []

    if (isPending) return <h2 className="text-xl">Please wait...</h2>

    return (
        <div className="grid grid-cols-1 gap-6">
            {snippets?.length < 1 ? (
                <main className="ml-6">
                    <div>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Create your first snippet!
                        </h1>

                        <div className="mt-10">
                            <Link
                                href="/new-snippet"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Create
                            </Link>
                        </div>
                    </div>
                </main>
            ) : (
                <>
                    {snippets?.map(
                        ({ _id, language, highlightedLines, title, code }) => (
                            <div
                                className="max-h-72 overflow-hidden rounded-lg"
                                key={_id}
                            >
                                <DynamicCodeBlock
                                    filename={title}
                                    code={code}
                                    highlightedLines={highlightedLines}
                                    id={_id}
                                    language={language}
                                />
                            </div>
                        )
                    )}
                </>
            )}
        </div>
    )
}
