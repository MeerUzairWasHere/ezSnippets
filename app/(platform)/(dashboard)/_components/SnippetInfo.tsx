'use client'
import { useQuery } from '@tanstack/react-query'
import { getSingleSnippetsAction } from '@/actions/snippet.actions'
import { SnippetCard } from './SnippetCard'

export const SnippetInfo = ({ id }: { id: string }) => {
    const { data } = useQuery({
        queryKey: ['snippet', id],
        queryFn: () => getSingleSnippetsAction(id),
    })

    const title = data?.title || ''
    const code = data?.code || ''
    const language = data?.language || 'jsx'
    const highlightLines = data?.highlightedLines
    return (
        <SnippetCard
            title={title}
            id={id.toString()}
            highlightLines={highlightLines}
            language={language}
            code={code}
            isInfo={true}
        />
    )
}
