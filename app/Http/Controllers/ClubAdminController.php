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
        $this->authorize('manageClub', $club);

        $request->validate([
            'role' => 'required|in:member,admin',
        ]);

        // Update the pivot table role
        $club->members()->updateExistingPivot($student->student_id, [
            'role' => $request->role,
        ]);

        // Also manage Admin table if making someone a club admin
        if ($request->role === 'admin') {
            Admin::firstOrCreate([
                'student_id' => $student->student_id,
                'admin_type' => 'club_admin',
                'club_id' => $club->club_id,
            ]);
        } else {
            Admin::where('student_id', $student->student_id)
                 ->where('admin_type', 'club_admin')
                 ->where('club_id', $club->club_id)
                 ->delete();
        }
        return redirect()->back()->with('success', "{$student->name}'s role updated.");
        
    }
    
    public function removeMember(Club $club, Student $student)
    {
        $this->authorize('manageClub', $club);

        $club->members()->detach($student->student_id);

        return redirect()->back()->with('success', "{$student->name} removed from club.");
    }
    
    public function indexEvents (Club $club)
    {
        $this->authorize('manageClub', $club);
        return inertia('ClubAdmin/Events/Index', [
        'events' =>$club->events()->with('attendees')->latest()->get(),
        'clubs'=>$club,
        ]);
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
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string',
        ]);
        
        $club->update($request->only('name', 'description', 'category'));

        return redirect()->back()->with('success', 'Club updated successfully.');
    }
    public function settings(Club $club)
    {
        $this->authorize('manageClub', $club);
        
        return inertia('ClubAdmin/Club/Settings', [
            'club' => $club,
        ]);
    }
    
    public function inviteMember(Request $request, Club $club)
    {
        $this->authorize('manageClub', $club);

        $request->validate([
            'student_id' => 'required|exists:students,student_id',
        ]);

        $student = Student::findOrFail($request->student_id);

        // Add to club if not already a member
        if (!$club->members()->where('student_id', $student->student_id)->exists()) {
            $club->members()->attach($student->student_id, [
                'role' => 'member',
                'status' => 'active',
            ]);

            return redirect()->back()->with('success', "{$student->name} invited to club.");
        }

        return redirect()->back()->with('info', "{$student->name} is already a member.");
    }
    
}
