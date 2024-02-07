import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { MobileSidebar } from './mobile-sidebar'
import Link from 'next/link'

export const Navbar = () => {
    return (
        <nav className="fixed top-0 z-50 flex h-14  w-full items-center border-b bg-white px-4 shadow-sm">
            <MobileSidebar />
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex ">
                    <Logo />
                </div>
                <Button
                    size="sm"
                    variant="primary"
                    asChild
                    className="hidden h-auto rounded-sm px-2 py-1.5 md:block"
                >
                    <Link href="/new-snippet">Create</Link>
                </Button>
                <Button
                    size="sm"
                    variant="primary"
                    asChild
                    className="flex rounded-sm  md:hidden"
                >
                    <Link href="/new-snippet">
                        <Plus className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 30,
                                width: 30,
                            },
                        },
                    }}
                />
            </div>
        </nav>
    )
}
