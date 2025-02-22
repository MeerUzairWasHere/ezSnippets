import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'

export const Footer = () => {
    return (
        <footer className="fixed bottom-0 w-full border-t bg-slate-100 p-3 ">
            <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
                <Logo inHomePage={true} />
                <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
                    <Button size="sm" variant="ghost">
                        Privacy Policy
                    </Button>
                    <Button size="sm" variant="ghost">
                        Terms of Service
                    </Button>
                </div>
            </div>
        </footer>
    )
}
