'use client'

import { Button } from "../ui/button"

import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

export const Social = () => {
    return (
        <div className="flex items-center gap-x-2 w-full">
            <Button
                variant='outline'
                size='lg'
                onClick={() => { }}
                className="w-full"
            >
                <FcGoogle className="w-5 h-5" />
            </Button>
            <Button
                variant='outline'
                size='lg'
                onClick={() => { }}
                className="w-full"
            >
                <FaGithub className="w-5 h-5" />
            </Button>
        </div>
    )
}