<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    protected $table = "likes";

    protected $fillable = ['user_id', 'post_id'];

    public $timestamps = false;

    static function getAllLikes(){
        $likes = Like::all();
        return $likes;
    }

    // Función encargada de comprobar si un susuario dado ya ha likeado un post dado
    static function yaHaLikeado($userId, $postId){
        $likes = Like::getAllLikesDeUsuario($userId);
        $yaLikeado = false;
        foreach ($likes as $like) {
            if($like->post_id == $postId){
                $yaLikeado = true;
            }
        }

        return $yaLikeado;
    }

    static function darLike($userId, $postId){

        if(!Post::yaHaLikeado($userId, $postId)){
            $like = new Like;
            $like->user_id = $userId;
            $like->post_id = $postId;
            $like->save();
        }
    }

    static function quitarLike($id){
        $like = Like::find($id);
        if($like != null){
            $like->delete();
            return true;
        }else{
            return false;
        }
    }

    static function getAllLikesDeUsuario($idUsuario){
        $likes = Like::where('user_id',$idUsuario)->get();
        return $likes;
    }
}
