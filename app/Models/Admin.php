<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $primaryKey = "admin_id";

    protected $fillable = [
        'student_id',
        'admin_type',
        'club_id',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class,'student_id','student_id');
    }

    public function club()
    {
        return $this->belongsTo(Club::class,'club_id','club_id');
    }
}
