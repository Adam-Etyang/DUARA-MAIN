<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Club;
use App\Models\Event;

class DashboardController extends Controller
{
    public function index()
    {
        $clubs = Club::where('created_by', auth()->id())->get();
        $events = Event::where('created_by', auth()->id())->get();

        return inertia('Dashboard/Index', [
            'clubs' => $clubs,
            'events' => $events,
        ]);
    }
}
