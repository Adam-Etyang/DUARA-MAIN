<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Create a sample student to be admin
        $student = Student::firstOrCreate([
            'email' => 'admin@example.com',
        ], [
            'name' => 'School Admin',
            'password' => Hash::make('password'), // Change to secure password
        ]);

        // Promote to school admin
        Admin::firstOrCreate([
            'student_id' => $student->student_id,
            'admin_type' => 'school_admin',
        ]);

        // You can add more admins here
    }
}
