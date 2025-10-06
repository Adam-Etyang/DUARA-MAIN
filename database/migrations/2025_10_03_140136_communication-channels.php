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
        if (!Schema::hasTable('communication_channels')) {
            Schema::create('communication_channels', function (Blueprint $table) {
                $table->id('channel_id');
                $table->unsignedBigInteger('club_id');
                $table->enum('type', ['whatsapp', 'discord', 'internal_chat', 'email']);
                $table->string('link_or_id')->nullable();
                $table->timestamps();

                $table->foreign('club_id')->references('club_id')->on('clubs')->cascadeOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
                Schema::dropIfExists('communication_channels');
    }
};
