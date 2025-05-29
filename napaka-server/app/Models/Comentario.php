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

    static function crearComentario($userId, $postId, $texto, $multimedia){
        $comentario = new Comentario;
        $comentario->user_id = $userId;
        $comentario->post_id = $postId;
        $comentario->texto = $texto;
        $comentario->multimedia = $multimedia;
        $comentario->save();
    }

    static function borrarComentario($id){
        $comentario = Comentario::find($id);

        if($comentario != null){
            $comentario->delete();
            return true;
        }else{
            return false;
        }
    }

    static function editarComentario($id, $texto, $multimedia){
        $comentario = Comentario::find($id);
        if($comentario != null){
            $comentario->texto = $texto;
            $comentario->multimedia = $multimedia;
            $comentario->save();
            return true;
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
