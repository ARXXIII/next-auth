'use client'

import * as z from 'zod';

import Link from 'next/link';

import { LoginSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { login } from '@/actions/login';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { CardWrapper } from "@/components/auth/card-wrapper"

export const LoginForm = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
        ? 'Email already is use with different provider!'
        : ''

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false)

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            login(values, callbackUrl)
                .then((data) => {
                    if (data) {
                        if (data?.error) {
                            form.reset()
                            setError(data.error)
                        }

                        if (data?.success) {
                            form.reset()
                            setSuccess(data.success)
                        }

                        if (data?.twoFactor) {
                            setShowTwoFactor(true)
                        }
                    }
                })
                .catch(() => setError('Something went wrong!'))
        })
    }

    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocials
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className='space-y-4'>

                        {showTwoFactor && (
                            <FormField
                                control={form.control}
                                name='code'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Two Factor Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder='123456'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {!showTwoFactor && (
                            <>
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='email'
                                                    disabled={isPending}
                                                    placeholder='john@doe.com'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='password'
                                                    disabled={isPending}
                                                    placeholder='********'
                                                    autoComplete='current-password'
                                                />
                                            </FormControl>
                                            <Button
                                                size='sm'
                                                variant='link'
                                                asChild
                                                className='px-0 font-normal'
                                            >
                                                <Link href='/auth/reset'>Forgot password?</Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        type='submit'
                        className='w-full'
                    >
                        {showTwoFactor ? 'Confirm' : 'Login'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}