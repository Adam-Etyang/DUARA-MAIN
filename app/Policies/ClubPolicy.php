<?php

namespace App\Policies;

use App\Models\Club;
use App\Models\Student;
use Illuminate\Auth\Access\Response;

class ClubPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(Student $student): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Student $student, Club $club): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Student $student): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Student $student, Club $club): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Student $student, Club $club): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Student $student, Club $club): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Student $student, Club $club): bool
    {
        return false;
    }
    public function manageClub(Student $user, Club $club)
    {
        if($user->isSchoolAdmin()){
            return true;
        }
        return $user->isClubAdmin($club->club_id);
    }
}
