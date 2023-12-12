<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Perromodel extends Model
{
    use HasFactory;
    use SoftDeletes;

    public $timestamps = false;

    protected $table = 'perros';

    protected $fillable = [
        'nombre',
        'edad',
        'raza',
        'descripcion',
        'url'
    ];
    protected $dates = ['deleted_at'];
}

