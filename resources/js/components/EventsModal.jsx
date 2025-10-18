import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EventModal({ open, onOpenChange, event }) {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black dark:text-white">
            {event.title}
          </DialogTitle>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {event.club?.name ? `Hosted by ${event.club.name}` : "Independent event"}
          </p>
        </DialogHeader>

        <div className="mt-6 space-y-4 text-gray-800 dark:text-gray-200">
          {/* Date & Time */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(event.start_time).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>
                {new Date(event.start_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                –{" "}
                {new Date(event.end_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{event.location}</span>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="font-semibold mb-1">About this event</h4>
            <p>{event.description || "No description provided."}</p>
          </div>

          {/* RSVP Info */}
          <div className="flex justify-between items-center pt-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Users className="w-5 h-5" />
              <span>{event.attendees_count || 0} attendees</span>
            </div>

            {event.is_registered ? (
              <Badge className="bg-green-600 text-white">You are registered</Badge>
            ) : (
              <Button
                className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                onClick={() =>
                  window.router.post(route("events.register"), { event_id: event.event_id })
                }
              >
                RSVP
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}