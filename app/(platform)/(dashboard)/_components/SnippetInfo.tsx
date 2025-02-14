import { getSingleSnippetsAction } from '@/actions/snippet.actions'
import { CodeBlock } from '@/components/ui/code-block'

export const SnippetInfo = async ({ snippetId }: { snippetId: string }) => {
    const snippet = await getSingleSnippetsAction(snippetId)
    if (!snippet) {
        return <div>Snippet not found</div>
    }
    return (
        <CodeBlock
            // @ts-ignore
            language={snippet.language}
            // @ts-ignore
            filename={snippet.filename}
            // @ts-ignore
            tabs={snippet.tabs}
            // @ts-ignore
            id={snippetId}
            isInfoCard={true}
            isScrollable={true}
        />
    )
}

export default SnippetInfo

//  <div className="flex items-center justify-between">
//                 <div>
//                     <p className="text-gray-500">{snippet.filename}</p>
//                 </div>
//                 <div className="flex gap-2">
//                     <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() =>
//                             router.push(`/snippets/edit/${snippetId}`)
//                         }
//                     >
//                         <Pencil className="mr-2 h-4 w-4" />
//                         Edit
//                     </Button>
//                     <DeleteSnippet id={snippetId} />
//                 </div>
//             </div>
