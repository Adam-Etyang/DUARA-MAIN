<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Club;
use App\Models\Student;
use App\Models\Admin;
use App\Models\Event;

class ClubAdminController extends Controller
{
    public function dashboard(Club $club)
    {
        return inertia('ClubAdmin/Dashboard', [
            'club' => $club->load([
            'members' => function ($q) {
                $q->with('adminRecords');
            },
            'events'
            ]),
            'members' => $club->members()->count(),
            'events' => $club->events()->count(),
            'upcomingEvents' => $club
                                ->events()
                                ->where('start_date', '>', now())
                                ->get(),
            'admins' => $club->admins()->count(),
        ]);
    }

    public function indexMembers(Club $club)
    {
        $this->authorize('manageClub', $club);
        return inertia('ClubAdmin/Members/Index', [
        'club'=>$club->load('members'),
        'members'=>$club->members,
        
        ]);
    }
    
    public function updateMemberRole(Request $request,Club $club, Student $student)
    {
        
        return redirect()->back()->with();
    }
    
    public function removeMember(Club $club, Student $student)
    {
        return redirect();
    }
    
    public function indexEvents (Club $club)
    {
        return inertia('ClubAdmin/Events/Index', []);
    }
    
    public function showEvent(Club $club, Event $event)
    {
        
        return inertia('ClubAdmin/Events/Show', [
            'club'=>$club,
            'event' => $event,
            'attendanceCount' =>$event->atendees()->count(),
            'atendees'=> $event->atendees(),
        ]);
    }
    
    public function editClub(Club $club)
    {
        $this->authorize('manageClub', $club);

        return inertia('ClubAdmin/Club/Edit', [
            'club' => $club,
        ]);
    }
    
    public function updateClub(Request $request, Club $club)
    {
        $this->authorize('manageClub', $club);
    }
    
}
