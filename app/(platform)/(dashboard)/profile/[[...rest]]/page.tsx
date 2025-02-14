import { UserProfile } from '@clerk/nextjs'

const ProfilePage = () => {
    return (
        <div className="flex justify-center p-4">
            <UserProfile routing="path" path="/profile" />
        </div>
    )
}

export default ProfilePage
