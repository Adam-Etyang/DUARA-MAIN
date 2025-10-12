<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureEmailIsVerified
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // If user is not logged in, just continue — 'auth' middleware will handle guests
        if (! Auth::check()) {
            return $next($request);
        }

        $user = Auth::user();

        // Check if the model has a verification field/method
        $isVerified = method_exists($user, 'hasVerifiedEmail')
            ? $user->hasVerifiedEmail()
            : ! empty($user->email_verified_at);

        if (! $isVerified) {
            // Redirect to your custom verify page
            return redirect()->route('verify.index');
        }

        return $next($request);
    }
}
