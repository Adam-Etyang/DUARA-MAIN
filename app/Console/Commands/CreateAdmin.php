<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Student;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class CreateAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create {email} {name} {--password= : Admin password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new school admin user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $name = $this->argument('name');
        $password = $this->option('password') ?: 'password'; // Default password

        // Check if student already exists
        $student = Student::where('email', $email)->first();
        if (!$student) {
            $student = Student::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make($password),
            ]);
        }

        // Promote to admin if not already
        if (!$student->isSchoolAdmin()) {
            Admin::create([
                'student_id' => $student->student_id,
                'admin_type' => 'school_admin',
            ]);
            $this->info("{$name} is now a school admin.");
        } else {
            $this->info("{$name} is already a school admin.");
        }
    }
}
