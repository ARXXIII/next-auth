'use client'

import { Button } from "../ui/button"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

export const Social = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')

    const onClick = (provider: 'github' | 'google') => {
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
        })
    }

    return (
        <div className="flex items-center gap-x-2 w-full">
            <Button
                variant='outline'
                size='lg'
                onClick={() => onClick('google')}
                className="w-full"
            >
                <FcGoogle className="w-5 h-5" />
            </Button>
            <Button
                variant='outline'
                size='lg'
                onClick={() => onClick('github')}
                className="w-full"
            >
                <FaGithub className="w-5 h-5" />
            </Button>
        </div>
    )
}