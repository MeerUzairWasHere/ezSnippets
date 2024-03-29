//start
import { getSingleSnippetsAction } from '@/actions/snippet.actions'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { SnippetInfo } from '../../_components/SnippetInfo'

export default async function Page({ params }: { params: { id: string } }) {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['snippet', params.id],
        queryFn: () => getSingleSnippetsAction(params.id),
    })
    return (
        <main className="w-full  ">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <SnippetInfo id={params.id} />
            </HydrationBoundary>
        </main>
    )
}
