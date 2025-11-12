<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('events')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $events = [
            // Coding Club Events
            ['club_id' => 1, 'title' => 'Web Development Workshop', 'description' => 'Learn modern web development with React and Node.js', 'location' => 'Tech Lab 101', 'status' => 'approved'],
            ['club_id' => 1, 'title' => 'Python Basics Tutorial', 'description' => 'Introduction to Python programming for beginners', 'location' => 'Tech Lab 102', 'status' => 'approved'],
            ['club_id' => 1, 'title' => 'Coding Competition', 'description' => 'Annual coding challenge with prizes', 'location' => 'Tech Lab 101', 'status' => 'approved'],

            // Art Society Events
            ['club_id' => 2, 'title' => 'Watercolor Painting Class', 'description' => 'Learn watercolor techniques with professional artists', 'location' => 'Art Studio', 'status' => 'approved'],
            ['club_id' => 2, 'title' => 'Digital Art Exhibition', 'description' => 'Showcase of student digital artwork', 'location' => 'Art Gallery', 'status' => 'approved'],
            ['club_id' => 2, 'title' => 'Sketching Workshop', 'description' => 'Master sketching and drawing fundamentals', 'location' => 'Art Studio', 'status' => 'approved'],

            // Football Club Events
            ['club_id' => 3, 'title' => 'Football Practice', 'description' => 'Weekly practice session for all players', 'location' => 'Sports Field', 'status' => 'approved'],
            ['club_id' => 3, 'title' => 'Inter-Club Football Tournament', 'description' => 'Friendly match with other school clubs', 'location' => 'Sports Field', 'status' => 'approved'],
            ['club_id' => 3, 'title' => 'Coaching Session', 'description' => 'Professional coaching from experienced trainers', 'location' => 'Sports Field', 'status' => 'approved'],

            // Debating Society Events
            ['club_id' => 4, 'title' => 'Debate Preparation Workshop', 'description' => 'Learn argumentation and debate techniques', 'location' => 'Main Hall', 'status' => 'approved'],
            ['club_id' => 4, 'title' => 'School Debate Championship', 'description' => 'Annual debate competition with judging', 'location' => 'Auditorium', 'status' => 'approved'],
            ['club_id' => 4, 'title' => 'Public Speaking Session', 'description' => 'Improve your public speaking skills', 'location' => 'Main Hall', 'status' => 'approved'],

            // Photography Club Events
            ['club_id' => 5, 'title' => 'Photography Walk Tour', 'description' => 'Guided photography tour capturing campus moments', 'location' => 'Campus', 'status' => 'approved'],
            ['club_id' => 5, 'title' => 'Photo Exhibition', 'description' => 'Display of best student photography works', 'location' => 'Gallery Hall', 'status' => 'approved'],
            ['club_id' => 5, 'title' => 'Camera Techniques Workshop', 'description' => 'Learn professional photography techniques', 'location' => 'Photography Lab', 'status' => 'approved'],

            // Basketball Team Events
            ['club_id' => 6, 'title' => 'Basketball Practice', 'description' => 'Regular practice and skill development', 'location' => 'Gym Court A', 'status' => 'approved'],
            ['club_id' => 6, 'title' => 'Friendly Basketball Match', 'description' => 'Match against neighboring schools', 'location' => 'Gym Court A', 'status' => 'approved'],
            ['club_id' => 6, 'title' => 'Three-Point Contest', 'description' => 'Fun competition within the team', 'location' => 'Gym Court A', 'status' => 'approved'],

            // Music Club Events
            ['club_id' => 7, 'title' => 'Live Music Jam Session', 'description' => 'Open jam session for all musicians', 'location' => 'Music Hall', 'status' => 'approved'],
            ['club_id' => 7, 'title' => 'Music Performance Night', 'description' => 'Showcase of student musical talents', 'location' => 'Auditorium', 'status' => 'approved'],
            ['club_id' => 7, 'title' => 'Instrument Masterclass', 'description' => 'Learn from professional musicians', 'location' => 'Music Studio', 'status' => 'approved'],

            // Environmental Club Events
            ['club_id' => 8, 'title' => 'Campus Cleanup Drive', 'description' => 'Environmental conservation activity', 'location' => 'Campus Grounds', 'status' => 'approved'],
            ['club_id' => 8, 'title' => 'Sustainability Workshop', 'description' => 'Learn about sustainable living practices', 'location' => 'Conference Room', 'status' => 'approved'],
            ['club_id' => 8, 'title' => 'Tree Planting Event', 'description' => 'Help plant trees around campus', 'location' => 'Green Area', 'status' => 'approved'],

            // Chess Club Events
            ['club_id' => 9, 'title' => 'Chess Tournament', 'description' => 'Competitive chess championship', 'location' => 'Game Room', 'status' => 'approved'],
            ['club_id' => 9, 'title' => 'Chess Beginners Class', 'description' => 'Learn chess basics and strategy', 'location' => 'Game Room', 'status' => 'approved'],
            ['club_id' => 9, 'title' => 'Blitz Chess Night', 'description' => 'Fast-paced chess games', 'location' => 'Game Room', 'status' => 'approved'],

            // Digital Design Club Events
            ['club_id' => 10, 'title' => 'UI/UX Design Workshop', 'description' => 'Learn user interface and experience design', 'location' => 'Design Lab', 'status' => 'approved'],
            ['club_id' => 10, 'title' => 'Graphic Design Showcase', 'description' => 'Exhibition of student design projects', 'location' => 'Gallery Hall', 'status' => 'approved'],
            ['club_id' => 10, 'title' => 'Adobe Creative Suite Tutorial', 'description' => 'Master Photoshop, Illustrator and more', 'location' => 'Design Lab', 'status' => 'approved'],
        ];

        foreach ($events as $event) {
            $startTime = now()->addDays(rand(1, 60))->setHour(rand(10, 18))->setMinute(0);
            $endTime = (clone $startTime)->addHours(2);

            DB::table('events')->insert([
                'club_id' => $event['club_id'],
                'title' => $event['title'],
                'description' => $event['description'],
                'location' => $event['location'],
                'start_time' => $startTime,
                'end_time' => $endTime,
                'capacity' => rand(20, 100),
                'requires_approval' => rand(0, 1),
                'status' => $event['status'],
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('events')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }
};
