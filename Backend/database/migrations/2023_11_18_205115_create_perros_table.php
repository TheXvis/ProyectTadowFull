<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePerrosTable extends Migration{
    public function up()
    {
        Schema::create('perros', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->integer('edad');
            $table->string('raza');
            $table->text('descripcion');
            $table->string('url')->nullable();;
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('perros');
    }
};