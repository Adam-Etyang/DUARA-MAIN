import { Link, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, Search, BarChart3, CheckCircle } from 'lucide-react';


export default function LandingPage() {
    return (
        <>
            <Head title="Welcome to Duara" />
            <div className="flex flex-col min-h-screen bg-white dark:bg-black">
                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center px-6 py-20 text-center bg-white dark:bg-black">
                    <h1 className="text-5xl font-bold text-black dark:text-white max-w-4xl leading-tight">
                        Stop Searching. Start Connecting.
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                        Finding and joining student clubs shouldn't feel like detective work. Duara makes it easy to discover clubs, track events, and get involved—all in one simple platform.
                    </p>
                    <div className="flex gap-4 mt-8">
                        <Link href={route('register')}>
                            <Button size="lg" className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                Get Started
                            </Button>
                        </Link>
                        <Link href={route('login')}>
                            <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-100 dark:border-white dark:text-white dark:hover:bg-gray-900">
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Problem Section */}
                <div className="px-6 py-16 bg-gray-50 dark:bg-gray-950">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
                            The Problem We're Solving
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-4">
                                        <Search className="w-6 h-6 text-black dark:text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                                        Manual & Disorganized
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Students rely on scattered posters and word-of-mouth to find clubs—wasting time and missing opportunities.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-4">
                                        <Users className="w-6 h-6 text-black dark:text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                                        No Central Platform
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        There's no unified place to discover all available clubs or stay updated on their activities.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-4">
                                        <BarChart3 className="w-6 h-6 text-black dark:text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                                        Limited Management Tools
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Club leaders struggle to track membership and event participation without proper tools.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="px-6 py-16 bg-white dark:bg-black">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-4">
                            One Platform. Complete Solution.
                        </h2>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                            Duara digitizes the entire club management process with a clean, user-friendly system.
                        </p>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <CheckCircle className="w-6 h-6 text-black dark:text-white flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                                            Discover Clubs Instantly
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Browse all campus clubs in one place. Filter by interests, see what's happening, and join with a click.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <CheckCircle className="w-6 h-6 text-black dark:text-white flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                                            Track Events & Activities
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Never miss an event. Get updates on club activities and RSVP to events that interest you.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <CheckCircle className="w-6 h-6 text-black dark:text-white flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                                            Powerful Management Tools
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Club leaders get everything they need: member tracking, event management, and participation analytics.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-950 rounded-lg p-8 border-2 border-gray-200 dark:border-gray-800">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
                                        <Calendar className="w-8 h-8 text-black dark:text-white" />
                                        <div>
                                            <div className="font-semibold text-black dark:text-white">Upcoming Events</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Stay in the loop</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
                                        <Users className="w-8 h-8 text-black dark:text-white" />
                                        <div>
                                            <div className="font-semibold text-black dark:text-white">Member Directory</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Connect with peers</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
                                        <BarChart3 className="w-8 h-8 text-black dark:text-white" />
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
                <div className="px-6 py-20 bg-gray-50 dark:bg-gray-950">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-black dark:text-white mb-6">
                            Ready to Get Involved?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
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
                <footer className="px-6 py-8 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
                    <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
                        <p>© 2025 Duara. Connecting students with campus clubs.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
