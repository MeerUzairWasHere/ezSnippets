import { Button } from '@/components/ui/button'
import Link from 'next/link'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'

const headingFont = localFont({
    src: '../../public/fonts/font.woff2',
})

const textFont = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div
                className={cn(
                    'flex flex-col items-center justify-center',
                    headingFont.className
                )}
            >
                <h1 className="mb-6 mt-6 text-center text-3xl text-neutral-800 md:text-6xl">
                    Organize Your Code Snippets
                </h1>
                <div className="w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-3 text-3xl text-white md:text-6xl">
                    with ezSnippets
                </div>
            </div>
            <div
                className={cn(
                    'mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-lg',
                    textFont.className
                )}
            >
                Store, categorize, and access your code snippets seamlessly.
                Boost your productivity and streamline your coding experience
                with ezSnippets.
            </div>
            <Button className="mt-6" size="lg" asChild>
                <Link href="/sign-up">Start Organizing with ezSnippets</Link>
            </Button>
        </div>
    )
}
