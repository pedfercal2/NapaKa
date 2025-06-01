<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\HasApiTokens;
use Throwable;

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

        // Control de almacenaje de ficheros

        if(isset($data["fotoPerfil"])){
            $imageName = time() . '.' . $data["fotoPerfil"]->getClientOriginalExtension();
            $data["fotoPerfil"]->move($uploadPath, $imageName);
        }else{
            $imageName = "default.png";
        }

        $usuario->foto_perfil = asset('imagenes/'. basename($imageName));

        if(isset($data["is_administrator"]) && $data["is_administrator"] == "true"){
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

        try{
            DB::beginTransaction();
            if($user != null){

            //Borrar Posts
            $posts = Post::where("user_id", $user->id)->get();

            foreach($posts as $post){
                // Borrar Likes de post
                Like::where("post_id", $post->id)->delete();
                // Borrar comentarios de post
                Comentario::where("post_id", $post->id)->delete();

                $post->delete();
            }

            // Borrar likes de usuario
            Like::where("user_id", $user->id)->delete();

            //Borrar comentarios de usuario
            Comentario::where("user_id", $user->id)->delete();

            //Borrar seguidores
            Seguidor::where("id_usuario", $user->id)->orWhere("id_seguidor", $user->id)->delete();
            //Borrar seguidos
            Seguido::where("id_usuario", $user->id)->orWhere("id_seguido", $user->id)->delete();
            //Borrar usuario
            $user->delete();
            DB::commit();
            return true;
            }
        }catch(Throwable $e){
                DB::rollBack();
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
       
        // Control de almacenaje de ficheros
        $uploadPath = public_path('imagenes');
        if(!file_exists($uploadPath)){
            mkdir($uploadPath, 0777, true);
        }

        if(isset($data["fotoPerfil"])){
            $imageName = time() . '.' . $data["fotoPerfil"]->getClientOriginalExtension();
            $data["fotoPerfil"]->move($uploadPath, $imageName);
            $user->foto_perfil = asset('imagenes/'. basename($imageName));
        }

        if($data["is_administrator"] == "true"){
            $user->is_administrator = true;
        }else{
            $user->is_administrator = false;
        }
        $user->save();
        return $user;
    }
}

