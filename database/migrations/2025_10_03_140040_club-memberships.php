<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('club_memberships')) {
            Schema::create('club_memberships', function (Blueprint $table) {
                $table->id('membership_id');
                $table->unsignedBigInteger('student_id');
                $table->unsignedBigInteger('club_id');
                $table->enum('role', ['member', 'admin'])->default('member');
                $table->enum('status', ['active', 'pending', 'rejected'])->default('pending');
                $table->timestamp('joined_at')->nullable();
                $table->timestamps();

                $table->foreign('student_id')->references('student_id')->on('students')->cascadeOnDelete();
                $table->foreign('club_id')->references('club_id')->on('clubs')->cascadeOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('club_memberships');
    }
};
