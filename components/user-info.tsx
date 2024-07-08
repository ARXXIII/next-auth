import { ExtendedUser } from "@/next-auth"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"

interface UserInfoProps {
    label: string
    user?: ExtendedUser
}

export const UserInfo = ({ label, user }: UserInfoProps) => {
    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-center font-semibold text-2xl">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row justify-between items-center p-3 border rounded-lg shadow-sm">
                    <p className="font-medium text-sm">
                        ID
                    </p>
                    <p className="p-1 max-w-[180px] font-mono text-xs bg-slate-100 rounded-md truncate ">
                        {user?.id}
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center p-3 border rounded-lg shadow-sm">
                    <p className="font-medium text-sm">
                        Name
                    </p>
                    <p className="p-1 max-w-[180px] font-mono text-xs bg-slate-100 rounded-md truncate ">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center p-3 border rounded-lg shadow-sm">
                    <p className="font-medium text-sm">
                        Email
                    </p>
                    <p className="p-1 max-w-[180px] font-mono text-xs bg-slate-100 rounded-md truncate ">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center p-3 border rounded-lg shadow-sm">
                    <p className="font-medium text-sm">
                        Role
                    </p>
                    <p className="p-1 max-w-[180px] font-mono text-xs bg-slate-100 rounded-md truncate ">
                        {user?.role}
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center p-3 border rounded-lg shadow-sm">
                    <p className="font-medium text-sm">
                        Two Factor Authentication
                    </p>
                    <Badge
                        variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}
                    >
                        {user?.isTwoFactorEnabled ? 'On' : 'Off'}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}