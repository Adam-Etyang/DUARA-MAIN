<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

    protected $primaryKey = 'event_id';

    protected $fillable = [
        'title',
        'description',
        'location',
        'start_time',
        'end_time',
        'club_id',
        'created_by',
        'capacity',
        'requires_approval',
        'status',
    ];
    
    public function club(){
                return $this->belongsTo(Club::class, 'club_id');
        }
    public function creator()
    {
        return $this->belongsTo(Student::class, 'created_by');
    }
    public function atendees()
    {
        return $this->belongsToMany(Student::class, 'event_registrations', 'event_id', 'student_id')
            ->withTimestamps();
    }
}
