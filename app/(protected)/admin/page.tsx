'use client'

import { toast } from "sonner"
import { admin } from "@/actions/admin"
import { UserRole } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { RoleGate } from "@/components/auth/role-gate"
import { FormSuccess } from "@/components/form-success"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const AdminPage = () => {
    const onApiRouteClick = () => {
        fetch('/api/admin')
            .then((response) => {
                if (response.ok) {
                    toast.success('Allowed API Route!')
                } else {
                    toast.error('Forbidden API Route!')
                }
            })
    }

    const onServerActionClick = () => {
        admin()
            .then((data) => {
                if (data.error) {
                    toast.error(data.error)
                }

                if (data.success) {
                    toast.success(data.success)
                }
            })
    }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-center font-semibold text-2xl">Admin</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this content!" />
                </RoleGate>
                <div className="flex flex-row justify-between items-center p-3 border rounded-lg shadow-md">
                    <p>Admin-only API Route</p>
                    <Button onClick={onApiRouteClick}>
                        Click to test
                    </Button>
                </div>
                <div className="flex flex-row justify-between items-center p-3 border rounded-lg shadow-md">
                    <p>Admin-only Server Action</p>
                    <Button onClick={onServerActionClick}>
                        Click to test
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AdminPage