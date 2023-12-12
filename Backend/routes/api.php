<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PerroController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/crearPerro', [PerroController::class, 'crear']);
Route::post('/editarPerro/{id}', [PerroController::class, 'update']);
Route::delete('/borrarPerro/{id}', [PerroController::class, 'eliminar']);
Route::get('/verPerros', [PerroController::class, 'verPerros']);
Route::get('/imagenRandom', [PerroController::class, 'imagenRandom']);
Route::get('/perroRandom', [PerroController::class, 'perroRandom']);
Route::get('/candidatos/{id}', [PerroController::class, 'obtenerCandidatos']);
Route::post('/preferencias/{id}', [PerroController::class, 'guardarPreferencias']);
Route::get('/match/{id1}/{id2}', [PerroController::class, 'match']);
Route::get('/{id}/aceptados', [PerroController::class, 'aceptados']);
Route::get('/{id}/rechazados', [PerroController::class, 'rechazados']);
Route::get('/perros/{id}', [PerroController::class, 'obtenerPerro']);
Route::delete('/eliminarInteraccion/{idInteresado}/{idCandidato}', [PerroController::class, 'eliminarInteraccion']);
Route::get('/obtenerInteracciones/{idInteresado}', [PerroController::class, 'obtenerInteracciones']);