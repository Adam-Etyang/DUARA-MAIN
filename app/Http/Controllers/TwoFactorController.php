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
        $request->validate(['two_factor_code' => 'required|numeric']);

        $student = Student::find(session('user_id'));

        if (!$student) {
            return redirect()->route('login')->withErrors('User not found.');
        }

        if ($student->two_factor_expires_at->lt(now())) {
            return redirect()->route('verify.index')->withErrors('The code has expired.');
        }

        if ($request->two_factor_code != $student->two_factor_code) {
            return redirect()->route('verify.index')->withErrors('Invalid code.');
        }

        $student->email_verified_at = now();
        $student->resetTwoFactorCode();
        session()->forget('user_id');

        return redirect()->route('dashboard');
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
