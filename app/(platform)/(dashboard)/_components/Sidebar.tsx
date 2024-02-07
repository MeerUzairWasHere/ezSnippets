'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import {
    Activity,
    CreditCard,
    Layout,
    Plus,
    Settings,
    User,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

 const routes = [
     {
         label: 'Snippets',
         icon: <Layout className="mr-2 h-4 w-4" />,
         href: `/snippets`,
     },
     {
         label: 'Create New',
         icon: <Plus className="mr-2 h-4 w-4" />,
         href: `/new-snippet`,
     },
     {
         label: 'Profile',
         icon: <User className="mr-2 h-4 w-4" />,
         href: `/profile`,
     },
 ]


 export const Sidebar = () => {
   

    const router = useRouter()
    const pathname = usePathname()

    const onClick = (href: string) => {
        router.push(href)
    }

    
    return (
        <>
            {routes.map((route) => (
                <Button
                    key={route.label}
                    size="sm"
                    onClick={() => onClick(route.href)}
                    className={cn(
                        'mb-1 w-full justify-start pl-10 font-normal',
                        pathname === route.href && 'bg-sky-500/10  text-sky-700'
                    )}
                    variant="ghost"
                >
                    {route.icon}
                    {route.label}
                </Button>
            ))}
        </>
    )
}
