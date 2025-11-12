import { Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  Plus,
  Search,
  Settings
} from "lucide-react";

export default function Dashboard() {
  const { clubs, events, myClubs, allClubs, upcomingEvents, flash } = usePage().props;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const filteredClubs = allClubs?.filter(club =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/circlehand.jpg')" }}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white dark:bg-black">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 2, textShadow: "0 0 10px rgba(255, 223, 0, 0.8)" }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 cursor-pointer select-none"
        >
          Duara<span className="text-yellow-300 dark:text-yellow-200">.</span>
        </motion.div>

        <div className="flex gap-4">
          <Link href="/account">
            <Button className="px-4 py-2 font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 dark:text-black dark:bg-gradient-to-r dark:from-yellow-200 dark:to-yellow-300 dark:hover:from-yellow-300 dark:hover:to-yellow-400 transition-all">
              My Account
            </Button>
          </Link>
          <Link href="../Clubs/Create">
            <Button className="px-4 py-2 font-medium bg-gradient-to-r from-black to-gray-800 text-white hover:from-gray-700 hover:to-yellow-500 dark:text-black dark:bg-gradient-to-r dark:from-white dark:to-gray-200 dark:hover:from-yellow-200 dark:hover:to-yellow-400 transition-all">
              <Plus className="w-4 h-4 mr-2 inline" />
              Request New Club
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Welcome Title */}
        <motion.h1
          whileHover={{ textShadow: "0 0 12px rgba(255, 223, 0, 0.9)", scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-3xl md:text-4xl font-semibold text-white dark:text-yellow-400 tracking-wide cursor-pointer select-none"
        >
          Welcome Back to your Dashboard!
        </motion.h1>
        <p className="text-gray-200 dark:text-gray-400 md:text-lg">
          Manage your clubs, explore new opportunities, and stay updated on events.
        </p>

        {/* Flash Messages */}
        {flash?.success && (
          <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-black dark:text-white p-4 rounded">
            {flash.success}
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="my-clubs" className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <TabsTrigger value="my-clubs" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black dark:data-[state=active]:bg-yellow-400 dark:data-[state=active]:text-black">
              My Clubs
            </TabsTrigger>
            <TabsTrigger value="explore" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black dark:data-[state=active]:bg-yellow-400 dark:data-[state=active]:text-black">
              Explore Clubs
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black dark:data-[state=active]:bg-yellow-400 dark:data-[state=active]:text-black">
              Upcoming Events
            </TabsTrigger>
          </TabsList>

          {/* My Clubs Tab */}
          <TabsContent value="my-clubs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold text-yellow-400">Your Clubs</h2>
              <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                {myClubs?.length || clubs?.length || 0} Clubs
              </Badge>
            </div>

            {(!myClubs || myClubs.length === 0) && (!clubs || clubs.length === 0) ? (
              <Card className="border-2 border-dashed border-yellow-400 bg-yellow-50 dark:bg-gray-950">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="w-12 h-12 text-yellow-300 mb-4" />
                  <p className="text-yellow-600 dark:text-yellow-400 text-center mb-4">
                    You haven't joined any clubs yet.
                  </p>
                  <Link href="#explore">
                    <Button className="px-4 py-2 border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-300 transition-all">
                      Explore Clubs
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(myClubs || clubs)?.map((club) => (
                  <Card
                    key={club.club_id}
                    className="border-2 border-yellow-400 hover:shadow-lg hover:scale-105 transition-all bg-white dark:bg-black"
                  >
                    <CardHeader>
                      <CardTitle className="text-yellow-400">{club.name}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {club.description || "No description available"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{club.members_count || 0} members</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Link href={`/clubs/${club.club_id}`} className="flex-1">
                          <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black dark:text-black transition-all">
                            View Details
                          </Button>
                        </Link>
                        {club.is_admin && (
                          <Link href={`/clubs/${club.club_id}/edit`}>
                            <Button className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-yellow-500 text-white dark:text-black dark:bg-gradient-to-r dark:from-white dark:to-gray-200 dark:hover:from-yellow-200 dark:hover:to-yellow-400 transition-all">
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
            <h2 className="text-xl md:text-2xl font-bold text-yellow-400">Discover Clubs</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-300" />
              <input
                type="text"
                placeholder="Search clubs by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-yellow-400 rounded-lg bg-white dark:bg-black text-black dark:text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {filteredClubs.length === 0 ? (
              <Card className="border-2 border-dashed border-yellow-400 bg-yellow-50 dark:bg-gray-950">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Search className="w-12 h-12 text-yellow-300 mb-4" />
                  <p className="text-yellow-600 dark:text-yellow-400 text-center">
                    {searchQuery ? "No clubs match your search." : "No clubs available to explore."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClubs.map((club) => (
                  <Card
                    key={club.club_id}
                    className="border-2 border-yellow-400 hover:shadow-lg hover:scale-105 transition-all bg-white dark:bg-black"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-yellow-400">{club.name}</CardTitle>
                        {club.is_member && (
                          <Badge className="bg-yellow-400 text-black dark:bg-yellow-300 dark:text-black">
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
                        <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                          {club.category}
                        </Badge>
                      )}
                      <Button
                        onClick={() => {
                          if (!club.is_member) router.post(route("clubs.join"), { club_id: club.club_id });
                          else router.visit(`/clubs/${club.club_id}`);
                        }}
                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black dark:text-black transition-all"
                      >
                        {club.is_member ? "View Club" : "Join Club"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Upcoming Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold text-yellow-400">Upcoming Events</h2>
              <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                {upcomingEvents?.length || events?.length || 0} Events
              </Badge>
            </div>

            {(!upcomingEvents || upcomingEvents.length === 0) && (!events || events.length === 0) ? (
              <Card className="border-2 border-dashed border-yellow-400 bg-yellow-50 dark:bg-gray-950">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="w-12 h-12 text-yellow-300 mb-4" />
                  <p className="text-yellow-600 dark:text-yellow-400 text-center">
                    No upcoming events at the moment.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {(upcomingEvents || events)?.map((event) => (
                  <Card
                    key={event.event_id}
                    className="border-2 border-yellow-400 hover:shadow-lg hover:scale-105 transition-all bg-white dark:bg-black"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <h3 className="text-lg md:text-xl font-bold text-yellow-400">{event.title}</h3>
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
                          <Button
                            onClick={() =>
                              router.post(route("events.register"), { event_id: event.event_id })
                            }
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black dark:text-black transition-all"
                          >
                            RSVP
                          </Button>
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

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-gray-700 dark:text-gray-300">
        &copy; {new Date().getFullYear()} Duara. All Rights Reserved.
      </footer>
    </main>
  );
}
