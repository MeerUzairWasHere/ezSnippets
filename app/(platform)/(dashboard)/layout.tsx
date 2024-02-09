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
            <section className="w-full px-4 pt-20 md:pt-24  ">
                <div className="flex gap-x-7">
                    <div className="hidden  w-64 shrink-0 md:block">
                        {/* Sidebar */}
                        <Sidebar />
                    </div>
                    <div className="w-full">{children}</div>
                </div>
            </section>
        </div>
    )
}
