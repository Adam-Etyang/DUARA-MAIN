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
        DB::table('clubs')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
        
        $clubs = [
            [
                'name' => 'Coding Club',
                'description' => 'Learn and share programming skills in a collaborative environment',
                'category' => 'Tech',
                'created_by' => 1,
            ],
            [
                'name' => 'Art Society',
                'description' => 'Explore visual arts, painting, drawing, and creative expression',
                'category' => 'Art',
                'created_by' => 1,
            ],
            [
                'name' => 'Football Club',
                'description' => 'Play and practice football with fellow enthusiasts',
                'category' => 'Sports',
                'created_by' => 1,
            ],
            [
                'name' => 'Debating Society',
                'description' => 'Develop public speaking and critical thinking through debates',
                'category' => 'Tech',
                'created_by' => 1,
            ],
            [
                'name' => 'Photography Club',
                'description' => 'Capture and share moments through the lens of photography',
                'category' => 'Art',
                'created_by' => 1,
            ],
            [
                'name' => 'Basketball Team',
                'description' => 'Join our competitive basketball team and tournaments',
                'category' => 'Sports',
                'created_by' => 1,
            ],
            [
                'name' => 'Music Club',
                'description' => 'Create, perform, and enjoy music with like-minded musicians',
                'category' => 'Art',
                'created_by' => 1,
            ],
            [
                'name' => 'Environmental Club',
                'description' => 'Work towards sustainability and environmental conservation',
                'category' => 'Tech',
                'created_by' => 1,
            ],
            [
                'name' => 'Chess Club',
                'description' => 'Master the game of chess and compete with other players',
                'category' => 'Sports',
                'created_by' => 1,
            ],
            [
                'name' => 'Digital Design Club',
                'description' => 'Learn UI/UX design, graphic design, and digital art',
                'category' => 'Art',
                'created_by' => 1,
            ],
        ];
        
        foreach ($clubs as $club) {
            DB::table('clubs')->insert($club);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('clubs')->truncate();
    }
};
