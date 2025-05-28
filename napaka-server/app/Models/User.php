<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = "users";

    protected $fillable = [
        'nombre',
        'email',
        'password',
        'biografia',
        'foto_perfil'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    static function getAllUsers(){
        $usuarios = User::all();
        return $usuarios;
    }

    static function crearUser($data){
        $usuario = new User;
        $usuario->nombre = $data['nombre'];
        $usuario->email = $data['email'];
        $usuario->password = bcrypt($data['password']);
        $usuario->biografia = "";
        $usuario->foto_perfil = $data['foto_perfil'];
        $usuario->is_administrator = false;
        $usuario->save();

        return $usuario;
    }

    static function getUser($id){
        return User::find($id)->get();
    }

    static function deleteUser($id){
        $user = User::find($id);

        if($user != null){
            $user->delete();
            return true;
        }else{
            return false;
        }
    }

    static function editarUser($data){
        $user = User::find($data['id']);
        if($data["password"] != "" || $data["password"] != null){
            $user->password = bcrypt($data["password"]);
        }
        $user->biografia = $data["biografia"];
        if($data["foto_perfil"] != "" || $data["foto_perfil"] != null){
            $user->foto_perfil = $data["foto_perfil"];
        }
        $user->is_administrator = $data["is_administrator"];
        $user->save();
        return $user;
    }
}

