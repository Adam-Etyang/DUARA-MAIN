<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        Auth::login($student);
        session()->forget('user_id');

        return redirect()->route('dashboard');
    }
}
