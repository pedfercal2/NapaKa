<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = "posts";

    protected $fillable = ['user_id', 'multimedia', 'texto'];

    public $timestamps = false;

    static function getAllPosts(){
        $posts = Post::all();
        return $posts;
    }

    static function crearPost($userId, $multimedia, $texto, $altImagen){
        $post = new Post;
        $post->user_id = $userId;
        $post->multimedia = $multimedia;
        $post->texto = $texto;
        $post->save();
    }

    static function borrarPost($id){
        $post = Post::find($id);

        if($post != null){
            $post->delete();
            return true;
        }else{
            return false;
        }
    }

    static function editarPost($id, $texto, $multimedia){
        $post = Post::find($id);

        if($post != null){
            $post->update(['texto' => $texto, 'multimedia' => $multimedia]);
            return true;
        }else{
            return false;
        }
    }

    static function getAllPostsDeUsuario($idUsuario){
        $posts = Post::where('user_id',$idUsuario)->get();
        return $posts;
    }

    // toDo get all posts de seguidos no silenciados
}
