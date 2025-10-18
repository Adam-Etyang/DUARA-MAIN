import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, ArrowLeft } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            
            <div className="min-h-screen flex bg-white dark:bg-black">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-gray-50 dark:bg-gray-950 items-center justify-center p-12">
                    <div className="max-w-md space-y-6">
                        <h1 className="text-5xl font-bold text-black dark:text-white">Join Duara</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Create your account and start exploring campus clubs today.
                        </p>
                        <div className="pt-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2"></div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Discover clubs that match your interests
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2"></div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Stay updated on all campus events
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2"></div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Connect with like-minded students
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Register Form */}
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-md space-y-8">
                        {/* Back to Home */}
                        <Link href="/">
                            <Button variant="ghost" className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 -ml-4">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Button>
                        </Link>

                        {/* Header */}
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-black dark:text-white">Create your account</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Get started with Duara in just a few steps
                            </p>
                        </div>

                        {/* Register Form */}
                        <form onSubmit={submit} className="space-y-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-black dark:text-white">
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    autoComplete="name"
                                    autoFocus
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="border-2 border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white bg-white dark:bg-black text-black dark:text-white"
                                    placeholder="John Doe"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-black dark:text-white">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="border-2 border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white bg-white dark:bg-black text-black dark:text-white"
                                    placeholder="you@example.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-black dark:text-white">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="border-2 border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white bg-white dark:bg-black text-black dark:text-white"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation" className="text-black dark:text-white">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="border-2 border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white bg-white dark:bg-black text-black dark:text-white"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password_confirmation && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.password_confirmation}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 h-11"
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                                        Creating account...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <UserPlus className="w-4 h-4" />
                                        Create Account
                                    </span>
                                )}
                            </Button>

                            {/* Login Link */}
                            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-800">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Already have an account?{' '}
                                    <Link
                                        href={route('login')}
                                        className="text-black dark:text-white font-semibold underline hover:no-underline"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}