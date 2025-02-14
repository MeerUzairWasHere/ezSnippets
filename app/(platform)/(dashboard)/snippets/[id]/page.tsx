//start

import SnippetInfo from '../../_components/SnippetInfo'

export default async function Page({ params }: { params: { id: string } }) {
    return <SnippetInfo snippetId={params.id} />
}
