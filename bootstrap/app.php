<?php

use App\Http\Middleware\Authenticate;
use App\Http\Middleware\RedirectifAuthenticated;
use App\Http\Middleware\EnsureEmailIsVerified;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\DuaraAuthenticate;
use App\Http\Middleware\IsSchoolAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
            'auth' => Authenticate::class,
            'guest' => RedirectifAuthenticated::class,
            //'verified' => EnsureEmailIsVerified::class,
            'duara.auth' => DuaraAuthenticate::class,
            'is_school_admin' => IsSchoolAdmin::class,

        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
