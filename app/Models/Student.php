<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use App\Models\Club;

class Student extends Authenticatable implements MustVerifyEmail
{
<<<<<<< HEAD
    use HasFactory;

    use Notifiable;
=======
    use HasFactory, Notifiable;
>>>>>>> eb8e333acf1770547e908d830c5fb123495b7f40
    protected $table = 'students';
    protected $primaryKey = 'student_id';

    protected $fillable = [
        'name',
        'email',
        'password',
        'two_factor_code',
        'two_factor_expires_at'
    ];

    protected $hidden = [
        'password',
        'two_factor_code',
        'remember_token',
    ];

    protected $casts = [
        'two_factor_expires_at' => 'datetime',
        'email_verified_at' => 'datetime',
    ];

    protected $dates = ['two_factor_expires_at', 'email_verified_at'];

    public function generateTwoFactorCode()
    {
        $this->timestamps = false;
        $this->two_factor_code = rand(100000, 999999);
        $this->two_factor_expires_at = Carbon::now()->addMinutes(10);
        $this->save();
    }
    public function resetTwoFactorCode()
    {
        $this->timestamps = false;
        $this->two_factor_code = null;
        $this->two_factor_expires_at = null;
        $this->save();
    }
    public function clubs()
    {
        return $this->belongsToMany(Club::class, 'club_memberships', 'student_id', 'club_id')
<<<<<<< HEAD
        ->withPivot('role', 'status')
        ->withTimestamps();
=======
            ->withPivot('role', 'status')
            ->withTimestamps();
>>>>>>> eb8e333acf1770547e908d830c5fb123495b7f40

    }
    public function events()
    {
        return $this->belongsToMany(Event::class, 'event_registrations', 'student_id', 'event_id')
            ->withTimestamps();
    }
    public function adminRecords()
    {
        return $this->hasMany(Admin::class, 'student_id', 'student_id');
    }
    public function isSchoolAdmin()
    {
        return $this->adminRecords()
<<<<<<< HEAD
                    ->where('admin_type', 'school_admin')
                    ->exists();
=======
            ->where('admin_type', 'school_admin')
            ->exists();
>>>>>>> eb8e333acf1770547e908d830c5fb123495b7f40
    }
    public function isClubAdmin($clubId = null)
    {
        $query = $this->adminRecords()
<<<<<<< HEAD
                      ->where('admin_type', 'club_admin');
=======
            ->where('admin_type', 'club_admin');
>>>>>>> eb8e333acf1770547e908d830c5fb123495b7f40

        if ($clubId) {
            $query->where('club_id', $clubId);
        }

        return $query->exists();
    }
    public function clubsWhereAdmin()
    {
        return $this->adminRecords()
<<<<<<< HEAD
                    ->where('admin_type', 'club_admin')
                    ->pluck('club_id')
                    ->toArray();
=======
            ->where('admin_type', 'club_admin')
            ->pluck('club_id')
            ->toArray();
>>>>>>> eb8e333acf1770547e908d830c5fb123495b7f40
    }



}
