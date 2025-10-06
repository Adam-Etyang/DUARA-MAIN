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
        if (!Schema::hasTable('event_registration')) {
            Schema::create('event_registrations', function (Blueprint $table) {
                $table->id('registration_id');
                $table->unsignedBigInteger('event_id');
                $table->unsignedBigInteger('student_id');
                $table->enum('status', ['registered', 'cancelled', 'attended', 'no_show'])->default('registered');
                $table->timestamp('registered_at')->useCurrent();
                $table->timestamp('checked_in_at')->nullable();
                $table->timestamps();

                $table->foreign('event_id')->references('event_id')->on('events')->cascadeOnDelete();
                $table->foreign('student_id')->references('student_id')->on('students')->cascadeOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_registrations');
    }
};
