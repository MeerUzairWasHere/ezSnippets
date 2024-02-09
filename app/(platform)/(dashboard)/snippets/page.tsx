import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'

import { SnippetsList } from '../_components/SnippetsList'
import { getAllSnippetsAction } from '@/actions/snippet.actions'


const queryClient = new QueryClient()

async function SnippetsPage() {
    await queryClient.prefetchQuery({
        queryKey: ['snippets'],
        queryFn: () => getAllSnippetsAction(),
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SnippetsList />
        </HydrationBoundary>
    )
}
export default SnippetsPage
