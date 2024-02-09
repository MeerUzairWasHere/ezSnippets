'use client'

import { getAllSnippetsAction } from '@/actions/snippet.actions'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'lucide-react'
import { SnippetCard } from './SnippetCard'

export const SnippetsList = () => {
    const { data, isPending } = useQuery({
        queryKey: ['snippets'],
        queryFn: () => getAllSnippetsAction(),
    })
    const snippets = data || []
    console.log(snippets)

    if (isPending) return <h2 className="text-xl">Please wait...</h2>
    if (snippets?.length < 1)
        return <h2 className="text-xl">No Snippet Found...</h2>
    return (
        <>
            <div className="flex flex-col gap-5">
                {snippets?.length < 1 ? (
                    <main className="ml-6  ">
                        <div className="">
                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                Create your first snippet!
                            </h1>

                            <div className="mt-10 ">
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
                        {snippets?.map(({ _id, title, code, createdAt }) => {
                            return (
                                <SnippetCard
                                    key={_id.toString()}
                                    id={_id.toString()}
                                    title={title}
                                    code={code}
                                    createdAt={createdAt}
                                />
                            )
                        })}
                    </>
                )}
            </div>
        </>
    )
}
