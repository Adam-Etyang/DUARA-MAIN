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
        Schema::create('admins', function (Blueprint $table) {
            $table->id('admin_id');
            $table->unsignedBigInteger('student_id');
            $table->enum('admin_type', ['club_admin', 'school_admin']);
            $table->unsignedBigInteger('club_id')->nullable();
            $table->timestamps();
            
            //foreign keys
            
            $table->foreign('student_id')
                  ->references('student_id')
                  ->on('students')
                  ->cascadeOnDelete();
            
            $table->foreign('club_id')
                  ->references('club_id')
                  ->on('clubs')
                  ->nullableOnDelete();

            // Unique constraint: one admin_type per student per club
            $table->unique(['student_id', 'admin_type', 'club_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
