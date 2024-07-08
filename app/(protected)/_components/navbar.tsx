'use client'

import Link from "next/link"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { UserButton } from "@/components/auth/user-button"

export const Navbar = () => {
    const pathName = usePathname()

    return (
        <nav className="flex justify-between items-center p-4 w-[600px] bg-secondary rounded-xl">
            <div className="flex gap-x-2">
                <Button
                    variant={pathName === '/admin' ? 'default' : 'outline'}
                    asChild
                >
                    <Link href='/admin'>
                        Admin
                    </Link>
                </Button>
                <Button
                    variant={pathName === '/client' ? 'default' : 'outline'}
                    asChild
                >
                    <Link href='/client'>
                        Client
                    </Link>
                </Button>
                <Button
                    variant={pathName === '/server' ? 'default' : 'outline'}
                    asChild
                >
                    <Link href='/server'>
                        Server
                    </Link>
                </Button>
                <Button
                    variant={pathName === '/settings' ? 'default' : 'outline'}
                    asChild
                >
                    <Link href='/settings'>
                        Settings
                    </Link>
                </Button>
            </div>
            <UserButton />
        </nav>
    )
}