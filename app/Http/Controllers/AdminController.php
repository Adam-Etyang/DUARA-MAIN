<?php

namespace App\Http\Controllers;

use App\Models\SchoolResource;
use Illuminate\Http\Request;

use App\Models\Student;
use App\Models\Club;
use App\Models\Event;
use App\Models\Admin;
use App\Models\ResourceRequest;

class AdminController extends Controller
{
    //overview of the whole sytem
    public function dashboard()
    {

        return inertia('Admin/Dashboard', [
        'totalstudents' => Student::count(),
        'totalClubs' => Club::count(),
        'totalEvents' => Event::count(),
        'totalAdmins' => Admin::count(),
        'recentClubs' =>Club::latest()->take(5)->get(),
        'pendingRequests' => ResourceRequest::where('status', 'pending')
                                            ->with('event', 'resource')
                                            ->take(10)
                                            ->get(),

        ]);

    }

    public function indexClubs()
    {
        return inertia('Admin/Club/Index', [
            'clubs' => Club::with('members')
                            ->withCount('members')
                            ->latest()
                            ->paginate(15),
        ]);

    }

    public function showClub(Club $club)
    {
        return inertia('Admin/Club/Show', [
            'club' => $club->load(['members', 'events', 'admins']),
        ]);
    }

    public function showEvents(Club $club)
    {
        return inertia('Admin/Club/Events', [
            'club' => $club,
            'events' => $club->events()->withCount('registrations')->get(),
        ]);
    }

    public function updateClubStatus(Request $request, Club $club)
    {
        $request->validate([
            'status' => 'required|in:active,inactive'
        ]);

        $club->update(['status' => $request->status]);

        return redirect()->back()->with('success', "Club status updated to {$request->status}.");
    }

    public function indexEvents()
    {
        return inertia('Admin/Events/Index', [
            'events' => Event::with('club')
                            ->withCount('atendees')
                            ->latest()
                            ->paginate(15),
        ]);

    }
    public function indexUsers()
    {
        $users = Student::with('adminRecords')
                        ->latest()
                        ->paginate(20)
                        ->through(function ($user) {
                            $user->is_school_admin = $user->isSchoolAdmin();
                            $user->is_club_admin = $user->isClubAdmin();
                            return $user;
                        });

        return inertia('Admin/Users/Index', [
            'users' => $users,
        ]);

    }
    public function promoteToSchoolAdmin(Request $request, Student $student)
    {
        $request->validate([
            'make_admin' => 'required|boolean',
        ]);

        if ($request->make_admin) {
            Admin::firstOrCreate([
                'student_id' => $student->student_id,
                'admin_type' => 'school_admin',
            ]);
            $message = "{$student->name} is now a School Admin.";
        } else {
            Admin::where('student_id', $student->student_id)
                 ->where('admin_type', 'school_admin')
                 ->delete();
            $message = "{$student->name} is no longer a School Admin.";
        }

        return redirect()->back()->with('success', $message);

    }
    public function indexResourcesRequest()
    {
        return inertia('Admin/ResourcesRequest/Index', [
            'requests' => ResourceRequest::with('event', 'resource', 'requestedBy')
                                        ->latest()
                                        ->paginate(15),
        ]);

    }

    public function updateResourceRequest(Request $request, $requestId)
    {
        $request -> validate(['status' => 'required|in:approved,denied',]);
        $resourceRequest = ResourceRequest::findOrFail($requestId);
        $resourceRequest->update([
            'status' => $request->status,
            'decided_at' => now(),
        ]);
        return redirect()->back()->with('success', 'Resource request {$request->status} updated.');

    }
    public function indexResource()
    {
        return inertia('Admin/Resources/Index', [
            'resources' => SchoolResource::
                                    latest()
                                    ->paginate(15),
        ]);

    }

    public function updateResource(Request $request, $resourceId)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'capacity' => 'nullable|integer',
            'status' => 'required|in:available,reserved,unavailable',
        ]);

        $resource = \App\Models\SchoolResource::findOrFail($resourceId);
        $resource->update($request->only('name', 'type', 'capacity', 'status'));
        return redirect()->back()->with('success', 'Resource updated.');

    }
    public function destroyResource($resourceId)
    {
        $resource = \App\Models\SchoolResource::findOrFail($resourceId);
        $resource->delete();
        return redirect()->back()->with('success', 'Resource deleted.');

    }
}


