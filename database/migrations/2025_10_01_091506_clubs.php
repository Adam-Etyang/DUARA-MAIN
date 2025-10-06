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
        if (!Schema::hasTable('clubs')) {
            Schema::create('clubs', function (Blueprint $table) {
                $table->id('club_id');
                $table->string('name');
                $table->text('description')->nullable();
                $table->unsignedBigInteger('created_by'); // student_id (admin)
                $table->string('category')->nullable();
                $table->string('logo_url')->nullable();
                $table->timestamps();

                $table->foreign('created_by')->references('student_id')->on('students')->cascadeOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clubs');
    }
};
