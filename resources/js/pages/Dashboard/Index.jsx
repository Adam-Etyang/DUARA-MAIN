import { Link, usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, Calendar, Clock, MapPin, Plus, Search, Settings } from "lucide-react";
import { useState } from "react";


export default function Dashboard() {
    const { clubs, events, myClubs, allClubs, upcomingEvents, flash } = usePage().props;
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);

    // Filter clubs based on search
    const filteredClubs = allClubs?.filter(club =>
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <main className="min-h-screen bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start">
                <div>
                <h1 className="text-4xl font-bold text-black dark:text-white">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your clubs and discover new opportunities</p>
                </div>
                <div className="flex gap-4">
                <Link href="/account">
                <Button variant="outline" className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                    <Settings className="w-4 h-4 mr-2" />
                        My Account
                        </Button>
                        </Link>
                        <Link href="../Clubs/Create">
                            <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                <Plus className="w-4 h-4 mr-2" />
                                Request New Club
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-gray-100 dark:bg-gray-900 border-l-4 border-black dark:border-white text-black dark:text-white p-4 rounded">
                        {flash.success}
                    </div>
                )}

                {/* Main Content Tabs */}
                <Tabs defaultValue="my-clubs" className="space-y-6">
                    <TabsList className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                        <TabsTrigger value="my-clubs" className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black">
                            My Clubs
                        </TabsTrigger>
                        <TabsTrigger value="explore" className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black">
                            Explore Clubs
                        </TabsTrigger>
                        <TabsTrigger value="events" className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black">
                            Upcoming Events
                        </TabsTrigger>
                    </TabsList>

                    {/* My Clubs Tab */}
                    <TabsContent value="my-clubs" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-black dark:text-white">Your Clubs</h2>
                            <Badge variant="outline" className="border-gray-300 dark:border-gray-700 text-black dark:text-white">
                                {myClubs?.length || clubs?.length || 0} Clubs
                            </Badge>
                        </div>

                        {(!myClubs || myClubs.length === 0) && (!clubs || clubs.length === 0) ? (
                            <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <Users className="w-12 h-12 text-gray-400 mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                                        You haven't joined any clubs yet.
                                    </p>
                                    <Link href="#explore">
                                        <Button variant="outline" className="border-black text-black hover:bg-gray-100 dark:border-white dark:text-white dark:hover:bg-gray-900">
                                            Explore Clubs
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {(myClubs || clubs)?.map((club) => (
                                    <Card key={club.club_id} className="border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors bg-white dark:bg-black">
                                        <CardHeader>
                                            <CardTitle className="text-black dark:text-white">{club.name}</CardTitle>
                                            <CardDescription className="text-gray-600 dark:text-gray-400">
                                                {club.description || "No description available"}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Users className="w-4 h-4" />
                                                <span>{club.members_count || 0} members</span>
                                            </div>
                                            {club.next_event && (
                                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>Next event: {club.next_event}</span>
                                                </div>
                                            )}
                                            
                                            <div className="flex gap-2 pt-2">
                                                <Link href={`/clubs/${club.club_id}`} className="flex-1">
                                                    <Button variant="outline" className="w-full border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                                                        View Details
                                                    </Button>
                                                </Link>
                                                {club.is_admin && (
                                                    <Link href={`/clubs/${club.club_id}/edit`}>
                                                        <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                                            Manage
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                            
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    {/* Explore Clubs Tab */}
                    <TabsContent value="explore" className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-black dark:text-white">Discover Clubs</h2>

                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search clubs by name or description..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white"
                                />
                            </div>
                        </div>

                        {filteredClubs.length === 0 ? (
                            <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <Search className="w-12 h-12 text-gray-400 mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400 text-center">
                                        {searchQuery ? "No clubs match your search." : "No clubs available to explore."}
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredClubs.map((club) => (
                                    <Card key={club.club_id} className="border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors bg-white dark:bg-black">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-black dark:text-white">{club.name}</CardTitle>
                                                {club.is_member && (
                                                    <Badge className="bg-black text-white dark:bg-white dark:text-black">
                                                        Joined
                                                    </Badge>
                                                )}
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
                                            {club.category && (
                                                <Badge variant="outline" className="border-gray-300 dark:border-gray-700 text-black dark:text-white">
                                                    {club.category}
                                                </Badge>
                                            )}
                                            
                                            <div className="block pt-2">
                                              <Button
                                                onClick={() => {
                                                  if (!club.is_member) {
                                                    // 🔹 Perform the join via Inertia POST
                                                    router.post(route("clubs.join"), { club_id: club.club_id });
                                                  } else {
                                                    // 🔹 If already joined, go to club details
                                                    router.visit(`/clubs/${club.club_id}`);
                                                  }
                                                }}
                                                className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                              >
                                                {club.is_member ? "View Club" : "Join Club"}
                                              </Button>
                                            </div>
                                            
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    {/* Upcoming Events Tab */}
                    <TabsContent value="events" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-black dark:text-white">Upcoming Events</h2>
                            <Badge variant="outline" className="border-gray-300 dark:border-gray-700 text-black dark:text-white">
                                {upcomingEvents?.length || events?.length || 0} Events
                            </Badge>
                        </div>

                        {(!upcomingEvents || upcomingEvents.length === 0) && (!events || events.length === 0) ? (
                            <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <Calendar className="w-12 h-12 text-gray-400 mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400 text-center">
                                        No upcoming events at the moment.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {(upcomingEvents || events)?.map((event) => (
                                    <Card key={event.event_id} className="border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors bg-white dark:bg-black">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div className="flex-1 space-y-2">
                                                    <h3 className="text-xl font-bold text-black dark:text-white">{event.title}</h3>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        {event.club?.name || event.club_name || "Independent event"}
                                                    </p>
                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                        {event.date && (
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="w-4 h-4" />
                                                                <span>{new Date(event.date).toLocaleDateString()}</span>
                                                            </div>
                                                        )}
                                                        {event.time && (
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="w-4 h-4" />
                                                                <span>{event.time}</span>
                                                            </div>
                                                        )}
                                                        {event.location && (
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="w-4 h-4" />
                                                                <span>{event.location}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-2">
                                                    <Dialog open={showEventModal && selectedEvent?.event_id === event.event_id}
                                                            onOpenChange={(open) => {
                                                              setShowEventModal(open);
                                                              if (!open) setSelectedEvent(null);
                                                            }}>
                                                      <Button
                                                        variant="outline"
                                                        className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                                                        onClick={() => {
                                                          setSelectedEvent(event);
                                                          setShowEventModal(true);
                                                        }}
                                                      >
                                                        View Details
                                                      </Button>
                                                    
                                                      {/* Event Details Modal */}
                                                      {selectedEvent && (
                                                        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                                                          <DialogHeader>
                                                            <DialogTitle className="text-2xl font-bold text-black dark:text-white">
                                                              {selectedEvent.title}
                                                            </DialogTitle>
                                                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                                              {selectedEvent.club?.name || "Independent event"}
                                                            </p>
                                                          </DialogHeader>
                                                    
                                                          <div className="mt-6 space-y-4 text-gray-800 dark:text-gray-200">
                                                            <div className="flex flex-wrap gap-6">
                                                              <div className="flex items-center gap-2">
                                                                <Calendar className="w-5 h-5" />
                                                                <span>
                                                                  {new Date(selectedEvent.start_time).toLocaleDateString()}
                                                                </span>
                                                              </div>
                                                              <div className="flex items-center gap-2">
                                                                <Clock className="w-5 h-5" />
                                                                <span>
                                                                  {new Date(selectedEvent.start_time).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                  })}{" "}
                                                                  –{" "}
                                                                  {new Date(selectedEvent.end_time).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                  })}
                                                                </span>
                                                              </div>
                                                            </div>
                                                    
                                                            {selectedEvent.location && (
                                                              <div className="flex items-center gap-2">
                                                                <MapPin className="w-5 h-5" />
                                                                <span>{selectedEvent.location}</span>
                                                              </div>
                                                            )}
                                                    
                                                            <div>
                                                              <h4 className="font-semibold mb-1">About this Event</h4>
                                                              <p>{selectedEvent.description || "No description available."}</p>
                                                            </div>
                                                          </div>
                                                    
                                                          <div className="flex justify-between items-center pt-6">
                                                            {selectedEvent.is_registered ? (
                                                              <Button
                                                                onClick={() =>
                                                                  router.delete(route("events.unregister", selectedEvent.event_id))
                                                                }
                                                                variant="outline"
                                                                className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                                                              >
                                                                Cancel RSVP
                                                              </Button>
                                                            ) : (
                                                              <Button
                                                                onClick={() =>
                                                                  router.post(route("events.register"), {
                                                                    event_id: selectedEvent.event_id,
                                                                  })
                                                                }
                                                                className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                                              >
                                                                RSVP
                                                              </Button>
                                                            )}
                                                          </div>
                                                        </DialogContent>
                                                      )}
                                                    </Dialog>
                                                    {!event.is_registered ? (
                                                      <Button
                                                        onClick={() =>
                                                          router.post(route("events.register"), { event_id: event.event_id })
                                                        }
                                                        className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                                      >
                                                        RSVP
                                                      </Button>
                                                    ) : (
                                                      <Button
                                                        onClick={() =>
                                                          router.delete(route("events.unregister", event.event_id))
                                                        }
                                                        variant="outline"
                                                        className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                                                      >
                                                        Cancel RSVP
                                                      </Button>
                                                    )}
                                                    
                                                    
                                                </div>
                                                
                                            </div>
                                        </CardContent>
                                    </Card>
                                    
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}
