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
        if (!Schema::hasTable('resource_requests')) {
            Schema::create('resource_requests', function (Blueprint $table) {
                $table->id('request_id');
                $table->unsignedBigInteger('event_id');
                $table->unsignedBigInteger('resource_id');
                $table->unsignedBigInteger('requested_by'); // student admin
                $table->enum('status', ['pending', 'approved', 'denied'])->default('pending');
                $table->timestamp('requested_at')->useCurrent();
                $table->timestamp('decided_at')->nullable();
                $table->timestamps();

                $table->foreign('event_id')->references('event_id')->on('events')->cascadeOnDelete();
                $table->foreign('resource_id')->references('resource_id')->on('school_resources')->cascadeOnDelete();
                $table->foreign('requested_by')->references('student_id')->on('students')->cascadeOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
                Schema::dropIfExists('resource_requests');
    }
};
