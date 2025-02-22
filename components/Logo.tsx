import Link from 'next/link'
import Image from 'next/image'
import localFont from 'next/font/local'

import { cn } from '@/lib/utils'

const headingFont = localFont({
    src: '../public/fonts/font.woff2',
})

export const Logo = ({ inHomePage }: { inHomePage?: boolean }) => {
    return (
        <Link href={`${inHomePage ? '/' : '/snippets'}`}>
            <div className="hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
                <Image src="/logo.svg" alt="Logo" height={30} width={30} />
                <p
                    className={cn(
                        'pt-1 text-lg text-neutral-700',
                        headingFont.className
                    )}
                >
                    ezSnippets
                </p>
            </div>
        </Link>
    )
}
