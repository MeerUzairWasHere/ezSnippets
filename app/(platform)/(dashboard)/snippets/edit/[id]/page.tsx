import { getSingleSnippetsAction } from '@/actions/snippet.actions'
import EditSnippetForm from '../../../_components/EditSnippetForm'

export default async function Page({ params }: { params: { id: string } }) {
    const snippet = getSingleSnippetsAction(params.id)
    return (
        <main className="w-full md:max-w-screen-sm">
            <EditSnippetForm id={params.id} />
        </main>
    )
}
