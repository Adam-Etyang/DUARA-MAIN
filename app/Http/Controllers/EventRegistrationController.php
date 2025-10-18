<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Event;

class EventRegistrationController extends Controller
{
    public function store(Request $request)
    {        $request->validate([
        'event_id' => 'required|exists:events,event_id',
    ]);

    $student = Auth::user();

    // Prevent duplicate registration
    $student->events()->syncWithoutDetaching([$request->event_id]);

    return redirect()->back()->with('success', 'You have registered for this event!');
    }
    public function destroy($eventId)
    {
        $student = Auth::user();
        $student->events()->detach($eventId);
        return redirect()->back()->with('success', 'You have unregistered from this event!');
    }
    
}
