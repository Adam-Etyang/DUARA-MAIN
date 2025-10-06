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
        if (!Schema::hasTable('events')) {
            Schema::create('events', function (Blueprint $table) {
                $table->id('event_id');
                $table->unsignedBigInteger('club_id');
                $table->unsignedBigInteger('created_by'); // student_id (admin)
                $table->string('title');
                $table->text('description')->nullable();
                $table->string('location')->nullable();
                $table->dateTime('start_time');
                $table->dateTime('end_time');
                $table->integer('capacity')->nullable();
                $table->boolean('requires_approval')->default(false);
                $table->enum('status', ['draft', 'approved', 'cancelled', 'completed'])->default('draft');
                $table->timestamps();

                $table->foreign('club_id')->references('club_id')->on('clubs')->cascadeOnDelete();
                $table->foreign('created_by')->references('student_id')->on('students')->cascadeOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
