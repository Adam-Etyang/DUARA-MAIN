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
     Route::get('/account', [ProfileController::class, 'manage'])->name('account.manage');
     Route::patch('/account/password', [ProfileController::class, 'changePassword'])->name('account.change-password');
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

     Route::get('/clubs/{club}/admin', [ClubAdminController::class, 'dashboard'])->name('clubs.admin.dashboard');

     Route::get('/clubs/{club}/admin/members', [ClubAdminController::class, 'indexMembers'])->name('clubs.admin.members.index');
     Route::patch('/clubs/{club}/admin/members/{student}/role', [ClubAdminController::class, 'updateMemberRole'])
          ->name('clubs.admin.members.update-role');
     Route::delete('/clubs/{club}/admin/members/{student}', [ClubAdminController::class, 'removeMember'])
          ->name('clubs.admin.members.destroy');
     Route::post('/clubs/{club}/admin/members/invite', [ClubAdminController::class, 'inviteMember'])
          ->name('clubs.admin.members.invite');

     Route::get('/clubs/{club}/admin/events', [ClubAdminController::class, 'indexEvents'])->name('clubs.admin.events.index');
     Route::get('/clubs/{club}/admin/events/{event}', [ClubAdminController::class, 'showEvent'])->name('clubs.admin.events.show');

     Route::get('/clubs/{club}/admin/edit', [ClubAdminController::class, 'editClub'])->name('clubs.admin.club.edit');
     Route::patch('/clubs/{club}/admin', [ClubAdminController::class, 'updateClub'])->name('clubs.admin.club.update');

     Route::get('/clubs/{club}/admin/settings', [ClubAdminController::class, 'settings'])->name('clubs.admin.settings');

    Route::get('/clubs/{club}/admin', [ClubAdminController::class, 'dashboard'])->name('clubs.admin.dashboard');

    Route::get('/clubs/{club}/admin', [ClubAdminController::class, 'dashboard'])->name('clubs.admin.dashboard');

    Route::get('/clubs/{club}/admin/members', [ClubAdminController::class, 'indexMembers'])->name('clubs.admin.members.index');
    Route::patch('/clubs/{club}/admin/members/{student}/role', [ClubAdminController::class, 'updateMemberRole'])
         ->name('clubs.admin.members.update-role');
    Route::delete('/clubs/{club}/admin/members/{student}', [ClubAdminController::class, 'removeMember'])
         ->name('clubs.admin.members.destroy');
    Route::post('/clubs/{club}/admin/members/invite', [ClubAdminController::class, 'inviteMember'])
         ->name('clubs.admin.members.invite');

    Route::get('/clubs/{club}/admin/events', [ClubAdminController::class, 'indexEvents'])->name('clubs.admin.events.index');
    Route::get('/clubs/{club}/admin/events/{event}', [ClubAdminController::class, 'showEvent'])->name('clubs.admin.events.show');

    Route::get('/clubs/{club}/admin/edit', [ClubAdminController::class, 'editClub'])->name('clubs.admin.club.edit');
    Route::patch('/clubs/{club}/admin', [ClubAdminController::class, 'updateClub'])->name('clubs.admin.club.update');

    Route::get('/clubs/{club}/admin/settings', [ClubAdminController::class, 'settings'])->name('clubs.admin.settings');

});

Route::middleware(['auth', 'verified', 'is_school_admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'dashboard'])
        ->name('admin.dashboard');
        Route::get('/admin/clubs', [AdminController::class, 'indexClubs'])->name('admin.clubs.index');
        Route::get('/admin/clubs/{club}', [AdminController::class, 'showClub'])->name('admin.clubs.show');
        Route::patch('/admin/clubs/{club}/status', [AdminController::class, 'updateClubStatus'])
             ->name('admin.clubs.update-status');

        Route::get('/admin/events', [AdminController::class, 'indexEvents'])->name('admin.events.index');

        Route::get('/admin/users', [AdminController::class, 'indexUsers'])->name('admin.users.index');
        Route::patch('/admin/users/{student}/promote', [AdminController::class, 'promoteToSchoolAdmin'])
             ->name('admin.users.promote');

        Route::get('/admin/resource-requests', [AdminController::class, 'indexResourceRequests'])
             ->name('admin.resource-requests.index');
        Route::patch('/admin/resource-requests/{id}', [AdminController::class, 'updateResourceRequest'])
             ->name('admin.resource-requests.update');

        Route::get('/admin/resources', [AdminController::class, 'indexResources'])->name('admin.resources.index');
        Route::post('/admin/resources', [AdminController::class, 'storeResource'])->name('admin.resources.store');
        Route::patch('/admin/resources/{id}', [AdminController::class, 'updateResource'])->name('admin.resources.update');
        Route::delete('/admin/resources/{id}', [AdminController::class, 'destroyResource'])->name('admin.resources.destroy');
});

Route::middleware(['auth', 'verified', 'is_school_admin'])->group(function () {
     Route::get('/admin', [AdminController::class, 'dashboard'])
          ->name('admin.dashboard');
     Route::get('/admin/clubs', [AdminController::class, 'indexClubs'])->name('admin.clubs.index');
     Route::get('/admin/clubs/{club}', [AdminController::class, 'showClub'])->name('admin.clubs.show');
     Route::patch('/admin/clubs/{club}/status', [AdminController::class, 'updateClubStatus'])
          ->name('admin.clubs.update-status');

     Route::get('/admin/events', [AdminController::class, 'indexEvents'])->name('admin.events.index');

     Route::get('/admin/users', [AdminController::class, 'indexUsers'])->name('admin.users.index');
     Route::patch('/admin/users/{student}/promote', [AdminController::class, 'promoteToSchoolAdmin'])
          ->name('admin.users.promote');

     Route::get('/admin/resource-requests', [AdminController::class, 'indexResourceRequests'])
          ->name('admin.resource-requests.index');
     Route::patch('/admin/resource-requests/{id}', [AdminController::class, 'updateResourceRequest'])
          ->name('admin.resource-requests.update');

     Route::get('/admin/resources', [AdminController::class, 'indexResources'])->name('admin.resources.index');
     Route::post('/admin/resources', [AdminController::class, 'storeResource'])->name('admin.resources.store');
     Route::patch('/admin/resources/{id}', [AdminController::class, 'updateResource'])->name('admin.resources.update');
     Route::delete('/admin/resources/{id}', [AdminController::class, 'destroyResource'])->name('admin.resources.destroy');
});

use App\Http\Controllers\TwoFactorController;

Route::get('/verify', [TwoFactorController::class, 'index'])->name('verify.index');
Route::post('/verify', [TwoFactorController::class, 'store'])->name('verify.store');
Route::post('/verify/resend', [TwoFactorController::class, 'resend'])->name('verify.resend');

require __DIR__ . '/auth.php';
