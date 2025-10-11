<?php

namespace Database\Seeders;
use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Student::create([
            'name' => 'Adam Demo',
            'email' => 'adam@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        Student::factory()->count(20)->create();
    }
}
