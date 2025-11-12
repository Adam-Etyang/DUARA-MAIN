<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Mail;
use App\Mail\TwoFactorCodeMail;
use App\Models\Student;

class SendTwoFactorCode
{
    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {
        // Cast to Student model to access custom methods
        $user = $event->user;

        // Only handle if it's a Student
        if (!$user instanceof Student) {
            return;
        }

        // Generate 2FA code
        $user->generateTwoFactorCode();

        // Send email with the code
        Mail::to($user->email)->send(new TwoFactorCodeMail($user->two_factor_code));

        // Store user ID in session for verification
        session(['user_id' => $user->student_id]);
    }
}
