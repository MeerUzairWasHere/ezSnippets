import { getAllSnippets } from '@/actions/snippet.actions'

export default async function Page() {
    const snippets = await getAllSnippets()
    return <main>Get all snippets</main>
}
