import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const { clubs, events, flash } = usePage().props;

    return (
        <main className="max-w-5xl mx-auto py-10 space-y-10">
            <h1 className="text-3xl font-bold mb-6">Welcome to Duara Dashboard</h1>

            {flash?.success && (
                <div className="bg-green-100 text-green-700 p-2 rounded">
                    {flash.success}
                </div>
            )}

            {/* Clubs Section */}
            <section>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Your Clubs</h2>
                    <Link href="/clubs/create">
                        <Button>Create Club</Button>
                    </Link>
                </div>

                {clubs.length === 0 ? (
                    <p className="mt-4 text-gray-600">No clubs created yet.</p>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {clubs.map((club) => (
                            <li
                                key={club.club_id}
                                className="p-4 border rounded-md shadow hover:bg-gray-50"
                            >
                                <p className="font-semibold text-lg">{club.name}</p>
                                <p className="text-gray-600 text-sm">{club.description}</p>
                                <Link
                                    href={`/clubs/${club.club_id}/edit`}
                                    className="text-blue-500 underline text-sm"
                                >
                                    Edit
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Events Section */}
            <section>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Your Events</h2>
                    <Link href="/events/create">
                        <Button>Create Event</Button>
                    </Link>
                </div>

                {events.length === 0 ? (
                    <p className="mt-4 text-gray-600">No events yet.</p>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {events.map((event) => (
                            <li
                                key={event.event_id}
                                className="p-4 border rounded-md shadow hover:bg-gray-50"
                            >
                                <p className="font-semibold text-lg">{event.title}</p>
                                <p className="text-gray-600 text-sm">
                                    {event.club?.name || "Independent event"}
                                </p>
                                <Link
                                    href={`/events/${event.event_id}/edit`}
                                    className="text-blue-500 underline text-sm"
                                >
                                    Edit
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
