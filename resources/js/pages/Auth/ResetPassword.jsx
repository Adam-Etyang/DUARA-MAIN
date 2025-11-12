import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, ArrowLeft } from 'lucide-react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Reset Password" />

            {/* Import Poppins font */}
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />

            <div className="min-h-screen flex bg-white font-[Poppins] dark:bg-black">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gray-50 dark:bg-gray-950 bg-cover bg-center"
                    style={{ backgroundImage: "url('/2handstogether.jpg')" }}
                >
                    <div className="max-w-md space-y-6 bg-black/30 p-6 rounded-md">
                        <h1 className="text-5xl font-bold text-yellow-500">Duara</h1>
                        <p className="text-xl text-gray-100">
                            Choose a new password to secure your account and continue exploring your campus community.
                        </p>
                        <div className="pt-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                                <p className="text-gray-100">Secure password encryption</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                                <p className="text-gray-100">Protected account access</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                                <p className="text-gray-100">Instant account recovery</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-md space-y-8">
                        {/* Back to Login */}
                        <Link href={route('login')}>
                            <Button variant="ghost" className="text-black dark:text-white hover:bg-yellow-100 dark:hover:bg-yellow-900 -ml-4 transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Login
                            </Button>
                        </Link>

                        {/* Header */}
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-yellow-500 dark:text-yellow-400">Reset your password</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Enter your new password below to complete the reset process.
                            </p>
                        </div>

                        {/* Form */}
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
                                    New Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="new-password"
                                    autoFocus
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="border-2 border-gray-200 dark:border-gray-800 focus:border-yellow-500 dark:focus:border-yellow-400 bg-white dark:bg-black text-black dark:text-white"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation" className="text-yellow-500 dark:text-yellow-400">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="border-2 border-gray-200 dark:border-gray-800 focus:border-yellow-500 dark:focus:border-yellow-400 bg-white dark:bg-black text-black dark:text-white"
                                    placeholder="••••••••"
                                />
                                {errors.password_confirmation && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.password_confirmation}</p>
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
                                        Resetting...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Key className="w-4 h-4" />
                                        Reset Password
                                    </span>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
