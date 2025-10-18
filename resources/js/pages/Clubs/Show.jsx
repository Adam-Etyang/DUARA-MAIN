import { useState } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import EventModal from "@/Components/EventsModal";
import { Users, Calendar, Plus, ArrowLeft, MapPin, Clock, Mail, User } from "lucide-react";

export default function ClubDashboard() {
  const { club, isMember, isAdmin, flash } = usePage().props;
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const handleJoin = () => {
    router.post(route("clubs.join"), { club_id: club.club_id });
  };

  const handleLeave = () => {
    router.delete(route("clubs.leave", club.club_id));
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Back Button */}
        <Link href="/dashboard">
          <Button variant="ghost" className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 -ml-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Flash Messages */}
        {flash?.success && (
          <div className="bg-gray-100 dark:bg-gray-900 border-l-4 border-black dark:border-white text-black dark:text-white p-4 rounded">
            {flash.success}
          </div>
        )}

        {/* Club Header */}
        <div className="relative">
          <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold text-black dark:text-white">{club.name}</h1>
                    {isMember && (
                      <Badge className="bg-black text-white dark:bg-white dark:text-black">
                        Member
                      </Badge>
                    )}
                    {isAdmin && (
                      <Badge className="bg-black text-white dark:bg-white dark:text-black">
                        Admin
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
                    {club.description || "No description available"}
                  </p>
                  
                  {/* Club Stats */}
                  <div className="flex flex-wrap gap-6 pt-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Users className="w-5 h-5" />
                      <span className="font-semibold text-black dark:text-white">{club.members?.length || 0}</span>
                      <span>members</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-5 h-5" />
                      <span className="font-semibold text-black dark:text-white">{club.events?.length || 0}</span>
                      <span>events</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {!isMember && (
                    <Button 
                      onClick={handleJoin} 
                      className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Join Club
                    </Button>
                  )}
                  {isMember && !isAdmin && (
                    <Button 
                      onClick={handleLeave} 
                      variant="outline"
                      className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                    >
                      Leave Club
                    </Button>
                  )}
                  {isAdmin && (
                    <Button
                      onClick={() => router.visit(`/clubs/${club.club_id}/edit`)}
                      className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                      Manage Club
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Members Section */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black dark:text-white">
                  <Users className="w-5 h-5" />
                  Members
                  <Badge variant="outline" className="ml-auto border-gray-300 dark:border-gray-700">
                    {club.members?.length || 0}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Active members of this club
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!club.members || club.members.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No members yet. Be the first to join!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {club.members.map((member, index) => (
                      <div key={member.student_id}>
                        {index > 0 && <Separator className="bg-gray-200 dark:bg-gray-800" />}
                        <div className="flex items-center gap-3 py-2">
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-black dark:text-white">{member.name}</p>
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <Mail className="w-3 h-3" />
                              <span>{member.email}</span>
                            </div>
                          </div>
                          {member.role && (
                            <Badge variant="outline" className="border-gray-300 dark:border-gray-700">
                              {member.role}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-black dark:text-white">
                      <Calendar className="w-5 h-5" />
                      Upcoming Events
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Events organized by this club
                    </CardDescription>
                  </div>
                  {isAdmin && (
                    <Button
                      onClick={() => router.visit(`/events/create?club_id=${club.club_id}`)}
                      className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Event
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!club.events || club.events.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No events scheduled yet</p>
                    {isAdmin && (
                      <Button
                        onClick={() => router.visit(`/events/create?club_id=${club.club_id}`)}
                        variant="outline"
                        className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create First Event
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {club.events.map((event, index) => (
                      <div key={event.event_id}>
                        {index > 0 && <Separator className="bg-gray-200 dark:bg-gray-800" />}
                        <div className="py-3 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg text-black dark:text-white">{event.title}</h4>
                              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(event.start_time).toLocaleDateString()}</span>
                                </div>
                                {event.time && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{event.time}</span>
                                  </div>
                                )}
                                {event.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{event.location}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                              onClick={() => {
                                setSelectedEvent(event);
                                setShowEventModal(true);
                              }}
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Quick Info */}
          <div className="space-y-6">
            <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">Club Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category</p>
                  <Badge variant="outline" className="border-gray-300 dark:border-gray-700">
                    {club.category || "General"}
                  </Badge>
                </div>
                
                <Separator className="bg-gray-200 dark:bg-gray-800" />
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                  <p className="font-medium text-black dark:text-white">
                    {club.is_active ? "Active" : "Inactive"}
                  </p>
                </div>

                {club.founded_date && (
                  <>
                    <Separator className="bg-gray-200 dark:bg-gray-800" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Founded</p>
                      <p className="font-medium text-black dark:text-white">
                        {new Date(club.founded_date).toLocaleDateString()}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
      <EventModal
        open={showEventModal}
        onOpenChange={setShowEventModal}
        event={selectedEvent}
      />
    </main>
  );
}