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
                                Just one more step to join your campus community and start exploring clubs and events.
                            </p>
                            <div className="pt-6 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                                    <p className="text-gray-100">Secure email verification</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                                    <p className="text-gray-100">Quick and easy process</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                                    <p className="text-gray-100">Full access to all features</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Verification Content */}
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
                                <h2 className="text-3xl font-bold text-yellow-500 dark:text-yellow-400">
                                    Verify your email
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Thanks for signing up! Before getting started, please verify your email by clicking the link we just sent you.
                                    Didn’t get the email? No worries — we’ll send you another one.
                                </p>
                            </div>

                            {/* Status Message */}
                            {status === 'verification-link-sent' && (
                                <div className="bg-gray-100 dark:bg-gray-900 border-l-4 border-yellow-500 text-black dark:text-white p-4 rounded text-sm">
                                    A new verification link has been sent to the email address you provided during registration.
                                </div>
                            )}

                            {/* Actions */}
                            <form onSubmit={submit} className="space-y-6">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-black text-white hover:bg-yellow-500 dark:bg-white dark:text-black dark:hover:bg-yellow-400 h-11 transition-transform hover:scale-105"
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

                                {/* Log Out */}
                                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 inline-flex items-center gap-2 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Log Out
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
