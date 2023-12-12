<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class createTableInteraccionUnique extends Migration{

    public function up()
    {
        Schema::create('interaccion', function (Blueprint $table) {
            $table->id();
            $table->foreignId('perro_interesado_id')->constrained('perros');
            $table->foreignId('perro_candidato_id')->constrained('perros');
            $table->string('preferencia');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('interaccion');
    }
};
