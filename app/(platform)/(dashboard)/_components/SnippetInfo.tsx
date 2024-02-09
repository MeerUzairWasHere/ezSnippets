'use client'
import { useQuery } from '@tanstack/react-query'
import { getSingleSnippetsAction } from '@/actions/snippet.actions'
import { SnippetCard } from './SnippetCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MoveLeft, StepBack } from 'lucide-react'

export const SnippetInfo = ({ id }: { id: string }) => {
    const { data } = useQuery({
        queryKey: ['snippet', id],
        queryFn: () => getSingleSnippetsAction(id),
    })
    const title = data?.title || ''
    const code = data?.code || ''

    return (
        <div className="flex flex-col items-end gap-5">
            <Button variant="outline" asChild>
                <Link href="/snippets">
                    <MoveLeft />
                </Link>
            </Button>
            <SnippetCard title={title} id={id} code={code} isInfo={true} />
        </div>
    )
}
