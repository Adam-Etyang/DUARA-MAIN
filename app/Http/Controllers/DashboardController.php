<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Club;
use App\Models\Event;
use App\Models\Student;

class DashboardController extends Controller
{
    public function index()
    {
        $student = Student::find(auth()->id());
        
        $userId = auth()->id();
        $myClubIds = $student->clubs()->pluck('clubs.club_id')->toArray();
        $myClubs = $student->clubs()->withCount('members')->get();
        $allClubs = Club::withCount('members')->get()
            ->map(function ($club) use ($myClubIds) {
                $club->is_member = in_array($club->club_id, $myClubIds);
                return $club;
            }); 
            
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
