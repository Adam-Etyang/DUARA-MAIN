<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Club extends Model
{
    use HasFactory;

    protected $primaryKey = 'club_id';
    protected $fillable = [
        'name',
        'description',
        'category',
        'admin',
        'status',
        'created_by',
    ];

    public function events()
    {
        return $this->hasMany(Event::class, 'club_id', 'club_id');
    }
    public function members()
    {
        return $this->belongsToMany(Student::class, 'club_memberships', 'club_id', 'student_id')
            ->withPivot('role', 'status')
            ->withTimestamps();
    }
    public function admins()
    {
        return $this->belongsTo(Student::class, 'created_by');
    }
}
