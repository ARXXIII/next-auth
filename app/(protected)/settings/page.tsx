'use client'

import * as z from 'zod'

import { useForm } from 'react-hook-form'
import { UserRole } from '@prisma/client'
import { SettingsSchema } from '@/schemas'
import { useSession } from "next-auth/react"
import { settings } from "@/actions/settings"
import { useState, useTransition } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { useCurrentUser } from '@/hooks/use-current-user'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormControl,
    FormMessage,
    FormDescription,
} from '@/components/ui/form'

const SettingsPage = () => {
    const user = useCurrentUser()

    const { update } = useSession()

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        }
    })

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error)
                    }

                    if (data.success) {
                        update()
                        setSuccess(data.success)
                    }
                })
                .catch(() => setError('Something went wrong!'))
        })
    }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-center font-semibold text-2xl">Settings</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <div className='space-y-4'>
                            <FormField
                                name='name'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='John Doe'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {user?.isOAuth === false && (
                                <>
                                    <FormField
                                        name='email'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type='email'
                                                        placeholder='john@doe.com'
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='password'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type='password'
                                                        placeholder='********'
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='newPassword'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type='password'
                                                        placeholder='********'
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}

                            <FormField
                                name='role'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                            disabled={isPending}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Select a role' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={UserRole.ADMIN}>
                                                    Admin
                                                </SelectItem>
                                                <SelectItem value={UserRole.USER}>
                                                    User
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {user?.isOAuth === false && (
                                <FormField
                                    name='isTwoFactorEnabled'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='flex flex-row justify-between items-center p-3 border rounded-lg shadow-sm'>
                                            <div className='space-y-0.5'>
                                                <FormLabel>Two Factor Authentication</FormLabel>
                                                <FormDescription>Enable two factor authentication for your account</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}

                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            type='submit'
                            disabled={isPending}
                        >
                            Save
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SettingsPage