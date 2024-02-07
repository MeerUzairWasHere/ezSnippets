import { Navbar } from './_components/Navbar'
import { Sidebar } from './_components/Sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full">
            <Navbar />
            <section className="max-w-6xl px-4 pt-20 md:pt-24 2xl:max-w-screen-xl ">
                <div className="flex gap-x-7">
                    <div className="hidden w-64 shrink-0 md:block">
                        {/* Sidebar */}
                        <Sidebar />
                    </div>
                    {children}
                </div>
            </section>
        </div>
    )
}
