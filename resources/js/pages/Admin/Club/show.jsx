import { Link, usePage, router, Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, MapPin, ArrowLeft, Edit, Trash2 } from "lucide-react";

export default function Show({ club }) {
    const { flash } = usePage().props;

    if (!club) {
        return <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center"><p>Loading...</p></div>;
    }

    return (
        <>
            <Head title={`${club.name} - Admin`} />
            <main className="min-h-screen bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                         <Button 
                             variant="outline" 
                             className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                             onClick={() => router.get(route('admin.clubs.index'))}
                         >
                             <ArrowLeft className="w-4 h-4 mr-2" />
                             Back to Clubs
                         </Button>
                        <div>
                            <h1 className="text-4xl font-bold text-black dark:text-white">{club.name}</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Club Details</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                            onClick={() => {
                                router.patch(route('admin.clubs.update-status', club.club_id), {
                                    status: club.status === 'active' ? 'inactive' : 'active'
                                });
                            }}
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            {club.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Button>
                    </div>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-gray-100 dark:bg-gray-900 border-l-4 border-black dark:border-white text-black dark:text-white p-4 rounded">
                        {flash.success}
                    </div>
                )}

                {/* Club Info */}
                <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-black dark:text-white">{club.name}</CardTitle>
                                <CardDescription className="text-gray-600 dark:text-gray-400">
                                    {club.description || "No description available"}
                                </CardDescription>
                            </div>
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
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Created</label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {new Date(club.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Members</label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {club.members?.length || 0} members
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs for Members and Events */}
                <Tabs defaultValue="members" className="space-y-6">
                    <TabsList className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                        <TabsTrigger value="members" className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black">
                            Members ({club.members?.length || 0})
                        </TabsTrigger>
                        <TabsTrigger value="events" className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black">
                            Events ({club.events?.length || 0})
                        </TabsTrigger>
                    </TabsList>

                    {/* Members Tab */}
                    <TabsContent value="members" className="space-y-6">
                        {club.members && club.members.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {club.members.map((member) => (
                                     <Card key={member.student_id} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                                         <CardContent className="p-4">
                                             <div className="flex justify-between items-start gap-4">
                                                 <div className="flex-1">
                                                     <p className="font-medium text-black dark:text-white">{member.name}</p>
                                                     <p className="text-sm text-gray-600 dark:text-gray-400">{member.email}</p>
                                                 </div>
                                                 <div className="flex items-center gap-2">
                                                     <Badge variant="outline" className="border-gray-300 dark:border-gray-700 text-black dark:text-white">
                                                         {member.pivot?.role || 'Member'}
                                                     </Badge>
                                                     <Button
                                                         variant="outline"
                                                         size="sm"
                                                         className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                                                         onClick={() => {
                                                             if (confirm(`Remove ${member.name} from this club?`)) {
                                                                 router.delete(route('admin.clubs.remove-member', { club: club.club_id, student: member.student_id }));
                                                             }
                                                         }}
                                                     >
                                                         <Trash2 className="w-4 h-4" />
                                                     </Button>
                                                 </div>
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
                                        No members yet.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    {/* Events Tab */}
                    <TabsContent value="events" className="space-y-6">
                        {club.events && club.events.length > 0 ? (
                            <div className="space-y-4">
                                {club.events.map((event) => (
                                    <Card key={event.event_id} className="border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors bg-white dark:bg-black">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div className="flex-1 space-y-2">
                                                    <h3 className="text-xl font-bold text-black dark:text-white">{event.title}</h3>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        {event.description || "No description"}
                                                    </p>
                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{new Date(event.start_time).toLocaleDateString()}</span>
                                                        </div>
                                                        {event.location && (
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="w-4 h-4" />
                                                                <span>{event.location}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                     <Button 
                                                         variant="outline" 
                                                         className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                                                         onClick={() => router.get(`/admin/clubs/${club.club_id}/events/${event.event_id}`)}
                                                     >
                                                         View Event
                                                     </Button>
                                                 </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <Calendar className="w-12 h-12 text-gray-400 mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400 text-center">
                                        No events for this club.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
            </main>
        </>
    );
}
