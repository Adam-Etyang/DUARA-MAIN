<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Club;


class MembershipController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $clubs = Club::all();
        return inertia('Membership/Index', [
            'user' => $user,
            'clubs' => $clubs,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'club_id' => 'required|exists:clubs,club_id'
        ]);
        $student = Auth::user();
        $student->clubs()->syncWithoutDetaching([$request->club_id]);//preventing duplicate entriesfor same student and club
        return redirect()->back()->with('success', 'You have joined the club!');
    }
    public function destroy($clubId)
    {
        $student = Auth::user();
        $student->clubs()->detach($clubId);
        return redirect()->back()->with('success', 'You have left the club!');
    }
    
    
}
