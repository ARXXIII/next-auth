'use client'

import { FaUser } from 'react-icons/fa'
import { LogoutButton } from './logout-button'
import { ExitIcon } from '@radix-ui/react-icons'
import { useCurrentUser } from '@/hooks/use-current-user'

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from '@/components/ui/dropdown-menu'

import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from '@/components/ui/avatar'

export const UserButton = () => {
    const user = useCurrentUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ''} />
                    <AvatarFallback className='bg-sky-500'>
                        <FaUser className='text-white' />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-40' align='end'>
                <LogoutButton>
                    <DropdownMenuItem className='cursor-pointer'>
                        <ExitIcon className='mr-2 w-4 h-4' />
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}