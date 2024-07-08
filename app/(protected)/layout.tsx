import { Navbar } from "./_components/navbar"

interface ProtectedLayoutProps {
    children: React.ReactNode
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
    return (
        <div className="flex flex-col justify-center items-center gap-y-10 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <Navbar />
            {children}
        </div>
    )
}