import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { BarChart3, Calendar, CheckCircle, Search, Users } from 'lucide-react';

export default function LandingPage() {
    return (
        <>
            <Head title="Welcome to Duara" />
            <div className="flex min-h-screen flex-col bg-white dark:bg-black">
                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center bg-white px-6 py-20 text-center dark:bg-black">
                    <h1 className="max-w-4xl text-5xl font-bold leading-tight text-black dark:text-white">Stop Searching. Start Connecting.</h1>
                    <p className="mt-6 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
                        Finding and joining student clubs shouldn't feel like detective work. Duara makes it easy to discover clubs, track events, and
                        get involved—all in one simple platform.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <Link href={route('register')}>
                            <Button size="lg" className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                Get Started
                            </Button>
                        </Link>
                        <Link href={route('login')}>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-black text-black hover:bg-gray-100 dark:border-white dark:text-white dark:hover:bg-gray-900"
                            >
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Problem Section */}
                <div className="bg-gray-50 px-6 py-16 dark:bg-gray-950">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="mb-12 text-center text-3xl font-bold text-black dark:text-white">The Problem We're Solving</h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            <Card className="border-2 border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
                                <CardContent className="pt-6">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
                                        <Search className="h-6 w-6 text-black dark:text-white" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">Manual & Disorganized</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Students rely on scattered posters and word-of-mouth to find clubs—wasting time and missing opportunities.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-2 border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
                                <CardContent className="pt-6">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
                                        <Users className="h-6 w-6 text-black dark:text-white" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">No Central Platform</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        There's no unified place to discover all available clubs or stay updated on their activities.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-2 border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
                                <CardContent className="pt-6">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
                                        <BarChart3 className="h-6 w-6 text-black dark:text-white" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">Limited Management Tools</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Club leaders struggle to track membership and event participation without proper tools.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-white px-6 py-16 dark:bg-black">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="mb-4 text-center text-3xl font-bold text-black dark:text-white">One Platform. Complete Solution.</h2>
                        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600 dark:text-gray-400">
                            Duara digitizes the entire club management process with a clean, user-friendly system.
                        </p>
                        <div className="grid items-center gap-12 md:grid-cols-2">
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-black dark:text-white" />
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">Discover Clubs Instantly</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Browse all campus clubs in one place. Filter by interests, see what's happening, and join with a click.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-black dark:text-white" />
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">Track Events & Activities</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Never miss an event. Get updates on club activities and RSVP to events that interest you.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-black dark:text-white" />
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">Powerful Management Tools</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Club leaders get everything they need: member tracking, event management, and participation analytics.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-950">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black">
                                        <Calendar className="h-8 w-8 text-black dark:text-white" />
                                        <div>
                                            <div className="font-semibold text-black dark:text-white">Upcoming Events</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Stay in the loop</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black">
                                        <Users className="h-8 w-8 text-black dark:text-white" />
                                        <div>
                                            <div className="font-semibold text-black dark:text-white">Member Directory</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Connect with peers</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black">
                                        <BarChart3 className="h-8 w-8 text-black dark:text-white" />
                                        <div>
                                            <div className="font-semibold text-black dark:text-white">Analytics Dashboard</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Track engagement</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gray-50 px-6 py-20 dark:bg-gray-950">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-6 text-4xl font-bold text-black dark:text-white">Ready to Get Involved?</h2>
                        <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
                            Join Duara today and discover the clubs that match your interests.
                        </p>
                        <Link href={route('register')}>
                            <Button size="lg" className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                Create Your Account
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white px-6 py-8 dark:border-gray-800 dark:bg-black">
                    <div className="mx-auto max-w-6xl text-center text-gray-600 dark:text-gray-400">
                        <p>© 2025 Duara. Connecting students with campus clubs.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
