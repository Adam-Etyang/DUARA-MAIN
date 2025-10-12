
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="p-6 mx-auto max-w-md rounded-lg shadow-md bg-white dark:bg-gray-800">
                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Welcome to Duara</h1>
                <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
                    Your one-stop platform for managing your club activities.
                </p>
                <div className="flex justify-center mt-6 space-x-4">
                    <Link href={route('login')}>
                        <Button variant="outline">Login</Button>
                    </Link>
                    <Link href={route('register')}>
                        <Button>Register</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
