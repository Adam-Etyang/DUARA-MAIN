import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, ArrowLeft, Eye } from "lucide-react";

export default function Events({ club, events }) {
    const { flash } = usePage().props;

    return (
        <main className="min-h-screen bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Link href={`/admin/clubs/${club.club_id}`}>
                            <Button variant="outline" className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Club
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold text-black dark:text-white">{club.name} - Events</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage events for this club</p>
                        </div>
                    </div>
                    <Link href="/admin/events">
                        <Button variant="outline" className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                            All Events
                        </Button>
                    </Link>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-gray-100 dark:bg-gray-900 border-l-4 border-black dark:border-white text-black dark:text-white p-4 rounded">
                        {flash.success}
                    </div>
                )}

                {/* Events List */}
                {events && events.length > 0 ? (
                    <div className="space-y-6">
                        {events.map((event) => (
                            <Card key={event.event_id} className="border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors bg-white dark:bg-black">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1 space-y-2">
                                            <h3 className="text-xl font-bold text-black dark:text-white">{event.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {event.description || "No description available"}
                                            </p>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{new Date(event.start_time).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        {new Date(event.start_time).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })} - {new Date(event.end_time).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </span>
                                                </div>
                                                {event.location && (
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4" />
                                                    <span>{event.registrations_count || 0} registered</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link href={`/admin/clubs/${club.club_id}/events/${event.event_id}`}>
                                                <Button variant="outline" className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View Details
                                                </Button>
                                            </Link>
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
                            <Link href={`/clubs/${club.club_id}/events/create`} className="mt-4">
                                <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                    Create First Event
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </main>
    );
}
