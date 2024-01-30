import { create } from '@/actions/board.actions'

const OrganizationIdPage = () => {
    return (
        <div>
            <form action={create}>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    placeholder="enter title"
                />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}
export default OrganizationIdPage
