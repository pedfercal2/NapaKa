<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seguidor extends Model
{
    use HasFactory;

    protected $table = "seguidores";

    static function getAllSeguidores(){
        $seguidores = Seguidor::all();
        return $seguidores;
    }
}
