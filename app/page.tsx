import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
    return (
        <main className="flex flex-col h-full justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <div className="text-center space-y-6">
                <h1 className="font-semibold text-6xl text-white drop-shadow-md">
                    Auth
                </h1>
                <p className="text-lg text-white">
                    A simple authentication service
                </p>
                <div>
                    <LoginButton mode="modal" asChild>
                        <Button variant='secondary' size='lg'>
                            Sign in
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </main>
    );
}
