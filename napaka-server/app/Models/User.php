<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
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
        'foto_perfil',
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
        if(isset($data["password"])){
            $usuario->password = bcrypt($data['password']);
        }
        if(isset($data["biografia"])){
            $usuario->biografia = $data["biografia"];
        }else{
            $usuario->biografia = "";
        }

        // Gestion del directorio donde se guardan imagenes subidas, si no existe se crea

        $uploadPath = public_path('imagenes');
        if(!file_exists($uploadPath)){
            mkdir($uploadPath, 0777, true);
        }

        if(isset($data["fotoPerfil"])){
            $imageName = time() . '.' . $data["fotoPerfil"]->getClientOriginalExtension();
            $data["fotoPerfil"]->move($uploadPath, $imageName);
            $usuario->foto_perfil = $imageName;
        }else{
            $imageName = "default.png";

            $usuario->foto_perfil = asset('imagenes/'. basename($imageName));
        }

        if(isset($data["is_administrator"])){
            $usuario->is_administrator = $data["is_administrator"];
        }else{
            $usuario->is_administrator = false;
        }
        $usuario->save();

        return $usuario;
    }

    static function getUser($id){
        return User::where('id', $id)->select('id', 'nombre', 'email', 'password' ,'biografia', 'foto_perfil', 'is_administrator')->get();
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

    static function comprobarEsAdmin($email, $password){
        $user = User::where('email', $email)->get();

        if(Hash::check($password ,$user->password)){
            if($user->is_administrator){
                return true;
            }
        }

        return false;
    }

    static function editarUser($data){
        $user = User::find($data['id']);
        if($data["password"] != "" || $data["password"] != null){
            $user->password = bcrypt($data["password"]);
        }
        $user->biografia = $data["biografia"];
        /*if($data["fotoPerfil"] != "" || $data["fotoPerfil"] != null){
            $user->foto_perfil = $data["fotoPerfil"];
        }*/
        $user->is_administrator = $data["is_administrator"];
        $user->save();
        return $user;
    }
}

