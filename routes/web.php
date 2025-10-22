<?php

use App\Http\Controllers\EventRegistrationController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\ClubAdminController;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return Inertia::render('LandingPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


    Route::resource('clubs', ClubController::class);
    Route::resource('events', EventController::class);

    Route::post('/clubs/join', [MembershipController::class, 'store'])->name('clubs.join');
    Route::delete('/clubs/{id}/leave', [MembershipController::class, 'destroy'])->name('clubs.leave');

    Route::post('/events/register', [EventRegistrationController::class, 'store'])->name('events.register');
    Route::delete('/events/{id}/unregister', [EventRegistrationController::class, 'destroy'])->name('events.unregister');

    Route::get('/clubs/{club}/admin', [ClubAdminController::class, 'dashboard'])->name('clubs.admin.dashboard');
});

Route::middleware(['auth', 'verified', 'is_school_admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'dashboard'])
        ->name('admin.dashboard');
});

use App\Http\Controllers\TwoFactorController;

Route::get('/verify', [TwoFactorController::class, 'index'])->name('verify.index');
Route::post('/verify', [TwoFactorController::class, 'store'])->name('verify.store');

require __DIR__ . '/auth.php';
