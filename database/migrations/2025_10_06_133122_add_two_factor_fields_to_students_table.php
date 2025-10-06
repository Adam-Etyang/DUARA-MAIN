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
        if (!Schema::hasTable('students')) {
            Schema::table('students', function (Blueprint $table) {
                $table->string('two_factor_code')->nullable();
                $table->timestamp('two_factor_expires_at')->nullable();
                $table->timestamp('email_verified_at')->nullable(); // optional, if not already there

            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn(['two_factor_code', 'two_factor_expires_at', 'email_verified_at']);
        });
    }
};
