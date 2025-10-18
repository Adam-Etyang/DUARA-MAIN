<?php

namespace Database\Factories;

use App\Models\Club;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    public function definition(): array
    {
        // Pick a random club to attach the event to
        $club = Club::inRandomOrder()->first();

        // Generate start/end times in the future
        $start = $this->faker->dateTimeBetween('+1 days', '+2 months');
        $end   = (clone $start)->modify('+2 hours');

        return [
            'club_id'       => $club?->club_id ?? Club::factory(), // fallback if no clubs
            'created_by'    => $club?->created_by ?? 1,
            'title'         => $this->faker->sentence(3),
            'description'   => $this->faker->paragraph(),
            'location'      => $this->faker->city(),
            'start_time'    => $start,
            'end_time'      => $end,
            'capacity'      => $this->faker->numberBetween(10, 100),
            'requires_approval' => $this->faker->boolean(30),
            'status'        => $this->faker->randomElement(['draft', 'approved', 'cancelled', 'completed']),
        ];
    }
}