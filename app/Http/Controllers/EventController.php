<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Club;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with('club')->latest()->get();
        return inertia('Events/Index', ['events' => $events]);
    }

    public function create()
    {
        $clubs = Club::all();
        return inertia('Events/Create', ['clubs' => $clubs]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'club_id'     => 'required|exists:clubs,club_id',
            'start_time'  => 'required|date',
            'end_time'    => 'required|date|after:start_time',
            'location'    => 'nullable|string',
        ]);

        Event::create([
            ...$data,
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('events.index')->with('success', 'Event created successfully.');
    }

    public function show(Event $event)
    {
        $event->load('club');
        return inertia('Events/Show', ['event' => $event]);
    }

    public function edit(Event $event)
    {
        $clubs = Club::all();
        return inertia('Events/Edit', ['event' => $event, 'clubs' => $clubs]);
    }

    public function update(Request $request, Event $event)
    {
        $event->update($request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time'  => 'required|date',
            'end_time'    => 'required|date|after:start_time',
            'location'    => 'nullable|string',
        ]));

        return redirect()->route('events.index')->with('success', 'Event updated successfully.');
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return redirect()->route('events.index')->with('success', 'Event deleted.');
    }
}