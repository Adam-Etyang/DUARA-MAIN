<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'name'              => $this->faker->name(),
        'email'             => $this->faker->unique()->safeEmail(),
        'password'          => Hash::make('password'),   // universal test password
        'created_at'        => now(),
        'updated_at'        => now(),
        ];
    }
    public function unverified(): static
    {
        return $this->state([
            'email_verified_at' => null,
        ]);
    
    }
}
