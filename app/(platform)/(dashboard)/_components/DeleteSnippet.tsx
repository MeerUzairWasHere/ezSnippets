import { deleteSnippetAction } from '@/actions/snippet.actions'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const DeleteSnippet = ({ id }: { id: string }) => {
    const router = useRouter()
    const { toast } = useToast()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            const data = await deleteSnippetAction(id)

            if (!data) {
                toast({
                    description: 'there was an error',
                })
                return
            }

            toast({ description: 'Snippet removed successfully!' })
            router.push('/snippets')
            router.refresh() // Refresh the page to show updated data
        } catch (error) {
            toast({
                description: 'Failed to delete snippet',
            })
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Button
            size="default"
            disabled={isDeleting}
            onClick={handleDelete}
            variant="destructive"
        >
            {isDeleting ? 'Deleting' : 'Delete'}
        </Button>
    )
}
