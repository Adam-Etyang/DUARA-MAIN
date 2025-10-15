<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Club;
use App\Models\Event;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $myClubs = Club::where('created_by', $userId)->get();
        $allClubs = Club::withCount('members')->latest()->get();
        $events = Event::with('club')->latest()->get();
        $upcomingEvents = Event::with('club')->where('start_time', '>', now())->orderBy('start_Time')->take(6)->get();

        return inertia('Dashboard/Index', [
            'clubs' => $myClubs,
            'myClubs' =>$myClubs,
            'allClubs' => $allClubs,
            'events' => $events,
            'upcomingEvents' => $upcomingEvents,
        ]);
    }
}
