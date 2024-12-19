import { deleteSnippetAction } from '@/actions/snippet.actions'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export const DeleteSnippet = ({ id }: { id: string }) => {
    const router = useRouter()
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => deleteSnippetAction(id),
        onSuccess: (data) => {
            if (!data) {
                toast({
                    description: 'there was an error',
                })
                return
            }
            queryClient.invalidateQueries({ queryKey: ['snippets'] })
            toast({ description: 'Snippet removed successfully!' })
            router.push('/snippets')
        },
    })
    return (
        <Button
            size="default"
            disabled={isPending}
            onClick={() => mutate(id)}
            variant="destructive"
        >
            {isPending ? 'Deleting' : 'Delete'}
        </Button>
    )
}
