import { Link, usePage, router, Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Eye, Edit } from "lucide-react";

export default function Index({ clubs }) {
    const { flash } = usePage().props;

    return (
        <main className="min-h-screen bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold text-black dark:text-white">Manage Clubs</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Review and manage all clubs in the system</p>
                    </div>
                    <Link href={route('admin.dashboard')}>
                        <Button variant="outline" className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-gray-100 dark:bg-gray-900 border-l-4 border-black dark:border-white text-black dark:text-white p-4 rounded">
                        {flash.success}
                    </div>
                )}

                {/* Clubs List */}
                {clubs && clubs.data && clubs.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clubs.data.map((club) => (
                            <Card key={club.club_id} className="border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors bg-white dark:bg-black">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-black dark:text-white">{club.name}</CardTitle>
                                        <Badge
                                            className={
                                                club.status === 'active'
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                            }
                                        >
                                            {club.status}
                                        </Badge>
                                    </div>
                                    <CardDescription className="text-gray-600 dark:text-gray-400">
                                        {club.description || "No description available"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Users className="w-4 h-4" />
                                        <span>{club.members_count || 0} members</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        <span>Created {new Date(club.created_at).toLocaleDateString()}</span>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                         <Button 
                                             variant="outline" 
                                             className="flex-1 border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                                             onClick={() => router.get(`/admin/clubs/${club.club_id}`)}
                                         >
                                             <Eye className="w-4 h-4 mr-2" />
                                             View Details
                                         </Button>
                                         <Button
                                            variant="outline"
                                            className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                                            onClick={() => {
                                                // Toggle status
                                                router.patch(`/admin/clubs/${club.club_id}/status`, {
                                                    status: club.status === 'active' ? 'inactive' : 'active'
                                                });
                                            }}
                                        >
                                            <Edit className="w-4 h-4 mr-2" />
                                            {club.status === 'active' ? 'Deactivate' : 'Activate'}
                                        </Button>
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
                                No clubs found.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </main>
    );
}
