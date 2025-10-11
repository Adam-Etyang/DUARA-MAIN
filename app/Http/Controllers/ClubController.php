<?php

namespace App\Http\Controllers;

use App\Models\Club;
use Illuminate\Http\Request;

class ClubController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clubs = Club::all();
        return inertia('Clubs/Index', ['clubs' => $clubs]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Clubs/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
        'name' => 'required | string | max:255',
        'description' => 'nullable|string',
        ]);
        Club::create([
        'name' => validated['name'],
        'description' => validated['description'],
        'created_by' => auth()->id(),
        ]);
        return redirect()->route('clubs.index')->with('success', 'Club created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Club $club)
    {
        return inertia('Clubs/Show', ['club' => $club]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Club $club)
    {
        return inertia('Clubs/Edit', ['club' => $club]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Club $club)
    {
        $club->update($request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]));

        return redirect()->route('clubs.index')->with('success', 'Club updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Club $club)
    {
        $club->delete();
        return redirect()->route('clubs.index')->with('success', 'Club deleted.');
    }
}
