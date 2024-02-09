//start
import { getSingleSnippetsAction } from '@/actions/snippet.actions'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { EditSnippetForm } from '../../../_components/EditSnippetForm'

export default async function Page({ params }: { params: { id: string } }) {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['snippet', params.id],
        queryFn: () => getSingleSnippetsAction(params.id),
    })
    return (
        <main className="w-full md:max-w-screen-sm">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <EditSnippetForm snippetId={params.id} />
            </HydrationBoundary>
        </main>
    )
}
