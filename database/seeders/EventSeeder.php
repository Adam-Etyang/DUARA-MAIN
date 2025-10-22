<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\Club;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        if (Club::count() === 0) {
            $this->command->warn('No clubs found. Seeding sample clubs first...');
            Club::factory()->count(5)->create();
        }

        // Create 3–5 events for each club
        Club::all()->each(function ($club) {
            Event::factory()->count(rand(3, 5))->create([
                'club_id'    => $club->club_id,
                'created_by' => $club->created_by,
            ]);
        });

        $this->command->info('Events seeded successfully ✔️');
    }
}