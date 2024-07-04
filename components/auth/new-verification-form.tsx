'use client'

import { FormError } from '../form-error'
import { CardWrapper } from './card-wrapper'
import { PulseLoader } from 'react-spinners'
import { FormSuccess } from '../form-success'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { newVerification } from '@/actions/new-verification'


export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const searchParams = useSearchParams()

    const token = searchParams.get('token')

    const onSubmit = useCallback(() => {
        if (!token) {
            setError('Messing token!')

            return
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError('Something went wrong!')
            })
    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex justify-center items-center w-full">

                {!success && !error && (
                    <PulseLoader />
                )}

                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>
    )
}