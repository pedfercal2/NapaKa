<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = "users";

    // para tener una clave primaria distinta de 'id' habría que poner -> protected $primaryKey = "nombreClave";

    static function getAllUsers(){
        $usuarios = User::all();
        return $usuarios;
    }
}

