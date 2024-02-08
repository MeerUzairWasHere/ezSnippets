import { createSnippet } from '@/actions/snippet.actions'
import { CreateAndEditSnippetType, SnippetType } from '@/types'

export default async function Page() {
    const snippetData: CreateAndEditSnippetType = {
        title: 'Ex23123', // Title of the snippet
        language: 'JavaScript', // Language of the code snippet
        code: "console.log('Hello, world!');", // Code content
        description: "A simple JavaScript snippet to print 'Hello, world!'", // Optional description
        tags: 'example, hello world, javascript', // Optional tags separated by commas
    }
   // const newSnippet = await createSnippet(snippetData)
 
    return <main>Create new snippet</main>
}
