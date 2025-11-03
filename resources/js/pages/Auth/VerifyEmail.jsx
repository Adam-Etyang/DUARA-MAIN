import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { MailCheck, ArrowLeft, LogOut } from 'lucide-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Email Verification" />

            <div className="min-h-screen flex bg-white dark:bg-black">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-gray-50 dark:bg-gray-950 items-center justify-center p-12">
                    <div className="max-w-md space-y-6">
                        <h1 className="text-5xl font-bold text-black dark:text-white">Duara</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Just one more step to join your campus community and start exploring clubs and events.
                        </p>
                        <div className="pt-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2"></div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Secure email verification
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2"></div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Quick and easy process
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2"></div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Full access to all features
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Content */}
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
                            <h2 className="text-3xl font-bold text-black dark:text-white">Verify your email</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                            </p>
                        </div>

                        {/* Status Message */}
                        {status === 'verification-link-sent' && (
                            <div className="bg-gray-100 dark:bg-gray-900 border-l-4 border-black dark:border-white text-black dark:text-white p-4 rounded text-sm">
                                A new verification link has been sent to the email address you provided during registration.
                            </div>
                        )}

                        {/* Actions */}
                        <form onSubmit={submit} className="space-y-4">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 h-11"
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <MailCheck className="w-4 h-4" />
                                        Resend Verification Email
                                    </span>
                                )}
                            </Button>

                            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-800">
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white inline-flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Log Out
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
