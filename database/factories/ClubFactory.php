<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ClubFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'        => fake()->company(),
            'description' => fake()->sentence(),
            'category'    => ['Tech', 'Art', 'Sports'][rand(0, 2)],
            'created_by'  => 1,
        ];
    }
}