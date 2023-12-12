<?php

namespace Database\Seeders;

use App\Models\Perromodel;
use Illuminate\Database\Seeder;
use App\Http\Controllers\PerroController;

class PerrosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        Perromodel::create([
            'nombre' => 'Max',
            'raza' => 'Labrador',
            'edad' => 3,
            'descripcion' => 'perrito kawai',
            'url' => PerroController::imagenRandom(),
        ]);
        
        Perromodel::create([
            'nombre' => 'Bella',
            'raza' => 'Golden Retriever',
            'edad' => 5,
            'descripcion' => 'perrito kawai',
            'url' => PerroController::imagenRandom(),
        ]);

        Perromodel::create([
            'nombre' => 'Canela',
            'raza' => 'Beagle',
            'edad' => 2,
            'descripcion' => 'perrito kawai',
            'url' => PerroController::imagenRandom(),
        ]);

        Perromodel::create([
            'nombre' => 'Blue',
            'raza' => 'Pug',
            'edad' => 3,
            'descripcion' => 'perrito kawai',
            'url' => PerroController::imagenRandom(),
        ]);

        Perromodel::create([
            'nombre' => 'Lobo',
            'raza' => 'Mestizo',
            'edad' => 7,
            'descripcion' => 'perrito kawai',
            'url' => PerroController::imagenRandom(),
        ]);
    }
};