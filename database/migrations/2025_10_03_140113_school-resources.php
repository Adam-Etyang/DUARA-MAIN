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
        if(!Schema::hasTable('school_resources')){
        Schema::create('school_resources', function (Blueprint $table) {
            $table->id('resource_id');
            $table->string('name');
            $table->string('type'); // venue, equipment, fund
            $table->integer('capacity')->nullable();
            $table->enum('status', ['available', 'reserved', 'unavailable'])->default('available');
            $table->timestamps();
        });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
            Schema::dropIfExists('school_resources');
    }
};
