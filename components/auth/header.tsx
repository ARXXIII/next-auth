import { cn } from "@/lib/utils";

interface HeaderProps {
    label: string;
}

export const Header = ({ label }: HeaderProps) => {
    return (
        <header className="flex flex-col justify-center items-center gap-x-4 w-full">
            <h1 className={cn(
                'font-semibold text-3xl'
            )}
            >
                Auth
            </h1>
            <p className="text-sm text-muted-foreground">
                {label}
            </p>
        </header>
    )
}