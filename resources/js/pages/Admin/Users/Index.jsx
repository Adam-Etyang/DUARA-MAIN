import { Link, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Crown, ArrowLeft } from "lucide-react";

export default function Index({ users }) {
    const { flash } = usePage().props;

    return (
        <main className="min-h-screen bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Link href="/admin">
                            <Button variant="outline" className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold text-black dark:text-white">Manage Users</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Review and manage user accounts</p>
                        </div>
                    </div>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-gray-100 dark:bg-gray-900 border-l-4 border-black dark:border-white text-black dark:text-white p-4 rounded">
                        {flash.success}
                    </div>
                )}

                {/* Users List */}
                {users && users.data && users.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users.data.map((user) => (
                            <Card key={user.student_id} className="border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors bg-white dark:bg-black">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-black dark:text-white">{user.name}</CardTitle>
                                        {user.is_school_admin ? (
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                <Crown className="w-3 h-3 mr-1" />
                                                School Admin
                                            </Badge>
                                        ) : user.is_club_admin ? (
                                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                <Shield className="w-3 h-3 mr-1" />
                                                Club Admin
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="border-gray-300 dark:border-gray-700 text-black dark:text-white">
                                                Student
                                            </Badge>
                                        )}
                                    </div>
                                    <CardDescription className="text-gray-600 dark:text-gray-400">
                                        {user.email}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Joined: {new Date(user.created_at).toLocaleDateString()}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Email Verified: {user.email_verified_at ? 'Yes' : 'No'}
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        {!user.is_school_admin ? (
                                            <Button
                                                onClick={() =>
                                                    router.patch(route('admin.users.promote', user.student_id), {
                                                        make_admin: true
                                                    })
                                                }
                                                className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                            >
                                                <Crown className="w-4 h-4 mr-2" />
                                                Promote to Admin
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    router.patch(route('admin.users.promote', user.student_id), {
                                                        make_admin: false
                                                    })
                                                }
                                                className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                                            >
                                                Demote
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Users className="w-12 h-12 text-gray-400 mb-4" />
                            <p className="text-gray-600 dark:text-gray-400 text-center">
                                No users found.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {users && users.links && (
                    <div className="flex justify-center mt-8">
                        <div className="flex space-x-1">
                            {users.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-2 text-sm border rounded ${
                                        link.active
                                            ? 'bg-black text-white dark:bg-white dark:text-black'
                                            : 'bg-white text-black border-gray-300 dark:bg-black dark:text-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
