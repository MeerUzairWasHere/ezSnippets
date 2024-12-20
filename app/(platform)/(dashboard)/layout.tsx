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
            <section className="w-full px-4 pt-20 md:pt-24">
                <div className="flex gap-x-7">
                    {/* Fixed Sidebar */}
                    <div className="fixed left-0 top-24 hidden h-[calc(100%-6rem)] w-64 shrink-0 md:block">
                        <Sidebar />
                    </div>

                    {/* Main Content with left margin to avoid overlap */}
                    <div className="w-full md:ml-72">{children}</div>
                </div>
            </section>
        </div>
    )
}
