<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Club;
use App\Models\Event;
use App\Models\Student;

class DashboardController extends Controller
{
    # method to display dashboard
    public function index()
    {
        $student = Student::find(auth()->id());

        //Clubs the student has joined
        $myClubs = $student->clubs()->withCount('members')->get();

        // Club IDs this student belongs to
        $myClubIds = $myClubs->pluck('club_id')->toArray();

        // All clubs (mark "is_member" = true if joined)
        $allClubs = Club::withCount('members')->get()
            ->map(function ($club) use ($myClubIds) {
                $club->is_member = in_array($club->club_id, $myClubIds);
                return $club;
            });

        //Get event IDs this student has registered for
        $registeredEventIds = $student->events()->pluck('events.event_id')->toArray();

        //All events (mark registered or not)
        $events = Event::with('club')->latest()->get()
            ->map(function ($event) use ($registeredEventIds) {
                $event->is_registered = in_array($event->event_id, $registeredEventIds);
                return $event;
            });

        // Upcoming events (start_time > now)
        $upcomingEvents = Event::with('club')
            ->where('start_time', '>', now())
            ->orderBy('start_time')
            ->take(6)
            ->get()
            ->map(function ($event) use ($registeredEventIds) {
                $event->is_registered = in_array($event->event_id, $registeredEventIds);
                return $event;
            });

        return inertia('Dashboard/Index', [
            'myClubs'        => $myClubs,
            'allClubs'       => $allClubs,
            'events'         => $events,
            'upcomingEvents' => $upcomingEvents,
        ]);
    }
}
