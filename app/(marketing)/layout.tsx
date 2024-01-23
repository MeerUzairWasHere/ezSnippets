import { Footer } from './_components/Footer'
import { Navbar } from './_components/Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full bg-slate-100">
            <Navbar />
            <main className="bg-slate-100 pb-20 pt-52 md:pt-28">
                {children}
            </main>
            <Footer />
        </div>
    )
}
