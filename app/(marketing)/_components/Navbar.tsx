import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const Navbar = () => {
    return (
        <header className="fixed top-0 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
            <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
                <Logo inHomePage={true} />
                <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
                    <Button size="sm" variant="outline" asChild>
                        <Link href="/sign-in">Login</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/sign-up">Get ezSnippets for free</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
