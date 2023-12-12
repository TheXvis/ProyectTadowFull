<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interaccionmodel extends Model
{
    use HasFactory;

    protected $table = 'interaccion';

    protected $fillable = [
        'perro_interesado_id',
        'perro_candidato_id',
        'preferencia',
    ];
}