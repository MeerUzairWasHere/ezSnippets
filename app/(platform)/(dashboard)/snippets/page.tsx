import { getAllSnippetsAction } from '@/actions/snippet.actions'
import { CodeBlock } from '@/components/ui/code-block'
import { SnippetType } from '@/types'
import Link from 'next/link'

async function SnippetsPage() {
    const snippets = await getAllSnippetsAction()
    console.log(snippets)
    return (
        <div className="grid grid-cols-1 gap-6">
            {!snippets || snippets.length < 1 ? (
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
                    {snippets.map(({ _id, filename, language, tabs }) => {
                        // @ts-ignore
                        const id = _id.toString()
                        return (
                            <div
                                className="max-h-72 overflow-hidden rounded-lg"
                                key={id}
                            >
                                <CodeBlock
                                    language={language}
                                    filename={filename}
                                    tabs={tabs}
                                    id={id}
                                />
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    )
}
export default SnippetsPage
