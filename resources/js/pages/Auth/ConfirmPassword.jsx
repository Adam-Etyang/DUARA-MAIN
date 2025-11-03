import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Confirm Password" />

            <div className="min-h-screen flex bg-white dark:bg-black">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-gray-50 dark:bg-gray-950 items-center justify-center p-12">
                    <div className="max-w-md space-y-6">
                        <h1 className="text-5xl font-bold text-black dark:text-white">Duara</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Secure access to sensitive areas of your account. Your security is our priority.
                        </p>
                        <div className="pt-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2"></div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Protected account settings
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2"></div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Enhanced security verification
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2"></div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Your data stays safe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-md space-y-8">
                        {/* Back Button */}
                        <Link href={route('dashboard')}>
                            <Button variant="ghost" className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 -ml-4">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>

                        {/* Header */}
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-black dark:text-white">Confirm your password</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                This is a secure area of the application. Please confirm your password before continuing.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">
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
                                    autoComplete="current-password"
                                    autoFocus
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="border-2 border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white bg-white dark:bg-black text-black dark:text-white"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.password}</p>
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
                                        Confirming...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4" />
                                        Confirm
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
