import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Building, Shield, Settings } from "lucide-react";

export default function Dashboard({ totalstudents, totalClubs, totalEvents, totalAdmins, recentClubs, pendingRequests }) {
    return (
        <main className="min-h-screen bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold text-black dark:text-white">Admin Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage the system overview</p>
                    </div>
                    <Link href="/account">
                        <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                            <Settings className="w-4 h-4 mr-2" />
                            My Account
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-black dark:text-white">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-black dark:text-white">{totalstudents}</div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-black dark:text-white">Total Clubs</CardTitle>
                            <Building className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-black dark:text-white">{totalClubs}</div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-black dark:text-white">Total Events</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-black dark:text-white">{totalEvents}</div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-black dark:text-white">Total Admins</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-black dark:text-white">{totalAdmins}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                    <CardHeader>
                        <CardTitle className="text-black dark:text-white">Quick Actions</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            Access common admin functions
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Link href="/admin/clubs">
                            <Button variant="outline" className="w-full justify-start border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                                <Building className="w-4 h-4 mr-2" />
                                Manage Clubs
                            </Button>
                        </Link>
                        <Link href="/admin/events">
                            <Button variant="outline" className="w-full justify-start border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                                <Calendar className="w-4 h-4 mr-2" />
                                Manage Events
                            </Button>
                        </Link>
                        <Link href="/admin/users">
                            <Button variant="outline" className="w-full justify-start border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                                <Users className="w-4 h-4 mr-2" />
                                Manage Users
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Recent Clubs */}
                {recentClubs && recentClubs.length > 0 && (
                    <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                        <CardHeader>
                            <CardTitle className="text-black dark:text-white">Recent Clubs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {recentClubs.map((club) => (
                                    <div key={club.club_id} className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-800">
                                        <span className="text-black dark:text-white">{club.name}</span>
                                        <Link href={`/admin/clubs/${club.club_id}`}>
                                            <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                                                View
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Pending Requests */}
                {pendingRequests && pendingRequests.length > 0 && (
                    <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                        <CardHeader>
                            <CardTitle className="text-black dark:text-white">Pending Resource Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {pendingRequests.map((request) => (
                                    <div key={request.id} className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-800">
                                        <span className="text-black dark:text-white">{request.event?.title || 'Unknown Event'}</span>
                                        <Link href="/admin/resource-requests">
                                            <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                                                Review
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </main>
    );
}
