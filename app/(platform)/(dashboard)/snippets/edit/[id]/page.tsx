import EditSnippetForm from '../../../_components/EditSnippetForm'

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <main className="w-full md:max-w-screen-sm">
            <EditSnippetForm id={params.id} />
        </main>
    )
}
