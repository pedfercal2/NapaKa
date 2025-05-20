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

    // para tener una clave primaria distinta de 'id' habría que poner -> protected $primaryKey = "nombreClave";

    static function getAllUsers(){
        $usuarios = User::all();
        return $usuarios;
    }

    // toDo - comprobaciones de no repetición de email?- preguntar si tiene sentido que haya varias cuentas con mismo email, si es así, k no se llamen igual - no repetidos!
    static function crearUser($nombre, $email, $password, $biografia, $fotoPerfil){
        $usuario = new User;
        $usuario->nombre = $nombre;
        $usuario->email = $email;
        $usuario->password = bcrypt($password);
        $usuario->biografia = $biografia;
        $usuario->foto_perfil = $fotoPerfil;
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

    static function editarUser($id,$nombre, $email, $password, $biografia, $fotoPerfil){
        return User::find($id)->update(['nombre' => $nombre, 'email' => $email, 'password' => bcrypt($password), 'biografia' => $biografia, 'foto_perfil' => $fotoPerfil]);
    }
}

