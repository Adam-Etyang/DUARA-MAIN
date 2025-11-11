import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { LogIn, ArrowLeft } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            {/* Import Google Font */}
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />

            <div className="flex min-h-screen flex-col bg-white font-[Poppins] dark:bg-black">
                <div className="flex flex-1">
                    {/* Left Side - Branding with Background Image */}
                    <div 
                        className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gray-50 dark:bg-gray-950 bg-cover bg-center"
                        style={{ backgroundImage: "url('/2handstogether.jpg')" }}
                    >
                        <div className="max-w-md space-y-6 bg-black/30 p-6 rounded-md">
                            <h1 className="text-5xl font-bold text-yellow-500">Duara</h1>
                            <p className="text-xl text-gray-100">
                                Your campus club management platform. Discover clubs, track events, and connect with your community.
                            </p>
                            <div className="pt-6 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                                    <p className="text-gray-100">
                                        Browse all campus clubs in one place
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                                    <p className="text-gray-100">
                                        Never miss an event with real-time updates
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                                    <p className="text-gray-100">
                                        Manage your club with powerful tools
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="flex-1 flex items-center justify-center p-8">
                        <div className="w-full max-w-md space-y-8">
                            {/* Back to Home */}
                            <Link href="/">
                                <Button 
                                    variant="ghost" 
                                    className="text-black dark:text-white hover:bg-yellow-100 dark:hover:bg-yellow-900 -ml-4 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Home
                                </Button>
                            </Link>

                            {/* Header */}
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold text-yellow-500 dark:text-yellow-400">Welcome back</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Sign in to your account to continue
                                </p>
                            </div>

                            {/* Status Message */}
                            {status && (
                                <div className="bg-gray-100 dark:bg-gray-900 border-l-4 border-yellow-500 text-black dark:text-white p-4 rounded text-sm">
                                    {status}
                                </div>
                            )}

                            {/* Login Form */}
                            <form onSubmit={submit} className="space-y-6">
                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-yellow-500 dark:text-yellow-400">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        autoFocus
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="border-2 border-gray-200 dark:border-gray-800 focus:border-yellow-500 dark:focus:border-yellow-400 bg-white dark:bg-black text-black dark:text-white"
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-yellow-500 dark:text-yellow-400">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="border-2 border-gray-200 dark:border-gray-800 focus:border-yellow-500 dark:focus:border-yellow-400 bg-white dark:bg-black text-black dark:text-white"
                                        placeholder="••••••••"
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                                    )}
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            checked={data.remember}
                                            onCheckedChange={(checked) => setData('remember', checked)}
                                            className="border-gray-300 dark:border-gray-700"
                                        />
                                        <Label 
                                            htmlFor="remember" 
                                            className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                                        >
                                            Remember me
                                        </Label>
                                    </div>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-yellow-500 dark:text-yellow-400 underline hover:no-underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-black text-white hover:bg-yellow-500 dark:bg-white dark:text-black dark:hover:bg-yellow-400 h-11 transition-transform hover:scale-105"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                                            Signing in...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <LogIn className="w-4 h-4" />
                                            Sign In
                                        </span>
                                    )}
                                </Button>

                                {/* Register Link */}
                                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Don't have an account?{' '}
                                        <Link
                                            href={route('register')}
                                            className="text-yellow-500 dark:text-yellow-400 font-semibold underline hover:no-underline"
                                        >
                                            Create account
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
