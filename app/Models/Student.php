<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;

class Student extends Authenticatable
{
    use Notifiable;
    protected $table = 'students';
    protected $primaryKey = 'student_id';
    
    protected $fillable = [
        'name', 'email', 'password','two_factor_code', 'two_factor_expires_at'
    ];
    protected $dates = ['two_factor_expires_at','email_verified_at'];
    
    public function generateTwoFactorCode()
    {
        $this->timestamps = false;
        $this->two_factor_code = rand(100000,999999);
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
    
    
    
    //
}
