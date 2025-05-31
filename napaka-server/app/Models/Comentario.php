<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    use HasFactory;

    protected $table = "comentarios";

    protected $fillable = ['user_id','post_id','texto','multimedia'];

    public $timestamps = false;

    static function getAllComentarios(){
        $comentarios = Comentario::all();
        return $comentarios;
    }

    static function crearComentario($data){
        $comentario = new Comentario;

        if(Comentario::usuarioYaHaComentado($data["user_id"], $data["post_id"])){
            return false;
        }else{
            $comentario->user_id = $data["user_id"];
            $comentario->post_id = $data["post_id"];
            $comentario->texto = $data["texto"];

            $uploadPath = public_path('imagenes');
            if(!file_exists($uploadPath)){
                mkdir($uploadPath, 0777, true);
            }

            if(isset($data["multimedia"])){
                $imageName = time() . '.' . $data["multimedia"]->getClientOriginalExtension();
                $data["multimedia"]->move($uploadPath, $imageName);
                $comentario->multimedia = asset('imagenes/'. basename($imageName));   
            }else{
                $comentario->multimedia = null;   
            }
        }

        $comentario->save();
        return true;
    }

    static function usuarioYaHaComentado($user_id, $post_id, $id=null){
        $comentarios = Comentario::getAllComentarios($user_id);

        foreach ($comentarios as $comentario){
            if($id == $comentario->id){
                return false;
            }elseif($comentario->user_id == $user_id && $comentario->post_id == $post_id){
                return true;
            }

        }

        return false;
    }

    static function deleteComentario($id){
        $comentario = Comentario::find($id)->delete();
        return true;
    }

    static function editarComentario($data){
        $comentario = Comentario::find($data["id"]);
        if($comentario != null){
            if(Comentario::usuarioYaHaComentado($data["user_id"], $data["post_id"], $data["id"])){
                return false;
            }else{
                $comentario->texto = $data["texto"];
                $comentario->user_id = $data["user_id"];
                $comentario->post_id = $data["post_id"];

                $uploadPath = public_path('imagenes');
                if(!file_exists($uploadPath)){
                    mkdir($uploadPath, 0777, true);
                }

                if(isset($data["multimedia"])){
                    $imageName = time() . '.' . $data["multimedia"]->getClientOriginalExtension();
                    $data["multimedia"]->move($uploadPath, $imageName);
                    $comentario->multimedia = asset('imagenes/'. basename($imageName));   
                }

                $comentario->save();
                return true;
            }
        }else{
            return false;
        }
    }
    
    static function getAllComentariosDeUsuario($idUsuario){
        $comentarios = Comentario::where('user_id',$idUsuario)->get();
        return $comentarios;
    }

    static function getAllComentariosDePost($idPost){
        $comentarios = Comentario::where('post_id',$idPost)->get();
        return $comentarios;
    }
}
