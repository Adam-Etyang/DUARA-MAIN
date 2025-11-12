<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\TwoFactorCodeMail;
use Inertia\Inertia;


class TwoFactorController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/VerifyCode');
    }

    public function store(Request $request)
    {
        $request->validate(['two_factor_code' => 'required|numeric|digits:6']);

        $student = Student::find(session('user_id'));

        if (!$student) {
            return back()->withErrors(['two_factor_code' => 'User not found. Please try registering again.']);
        }

        if (!$student->two_factor_expires_at || $student->two_factor_expires_at->lt(now())) {
            return back()->withErrors(['two_factor_code' => 'The code has expired. Please request a new one.']);
        }

        if ($request->two_factor_code != $student->two_factor_code) {
            return back()->withErrors(['two_factor_code' => 'Invalid code. Please check and try again.']);
        }

        // Mark email as verified
        $student->email_verified_at = now();
        $student->resetTwoFactorCode();
        $student->save();

        // Clear the temporary user_id first
        session()->forget('user_id');

        // Log the user in with remember token
        Auth::login($student, true);

        // Regenerate session for security
        $request->session()->regenerate();

        // Redirect to appropriate dashboard based on role
        if ($student->isAdmin()) {
            return redirect()->route('admin.dashboard')->with('success', 'Email verified successfully! Welcome to Duara.');
        }

        return redirect()->route('dashboard')->with('success', 'Email verified successfully! Welcome to Duara.');
    }

    /**
     * Resend the 2FA code email
     */
    public function resend(Request $request)
    {
        $student = Student::find(session('user_id'));

        if (!$student) {
            return redirect()->route('login')->withErrors('Session expired. Please login again.');
        }

        // Generate new code
        $student->generateTwoFactorCode();

        // Send email with the new code
        Mail::to($student->email)->send(new TwoFactorCodeMail($student->two_factor_code));

        return back()->with('status', 'A new verification code has been sent to your email.');
    }
}
