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

        ]);
    }

    public function indexMembers(Club $club)
    {
        return inertia('', [
        
        ]);
    }
    public function updateMemberRole(Request $request,Student $student, )
    {
    }
}
