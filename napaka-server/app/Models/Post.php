<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Throwable;

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

    static function crearPost($data){
        $post = new Post;
        $post->user_id = $data["user_id"];

        // Control de almacenaje de ficheros
        $uploadPath = public_path('imagenes');
        if(!file_exists($uploadPath)){
            mkdir($uploadPath, 0777, true);
        }

        if(isset($data["multimedia"])){
            $imageName = time() . '.' . $data["multimedia"]->getClientOriginalExtension();
            $data["multimedia"]->move($uploadPath, $imageName);
            $post->multimedia = asset('imagenes/'. basename($imageName));   
        }else{
            $post->multimedia = null;
        }
        $post->texto = $data["texto"];
        $post->save();
    }

    static function deletePost($id){
        $post = Post::find($id);

        if($post != null){
            $post->delete();
            return true;
        }else{
            return false;
        }

        try{
            DB::beginTransaction();
            if($post!= null){
                //Borrar likes
                Like::where("post_id", $post->id)->delete();
                
                //Borrar comentarios
                Comentario::where("post_id", $post->id)->delete();
                
                //Borrar post
                $post->delete();
                DB::commit();
                return true;
            }
        }catch(Throwable $e){
            DB::rollBack();
            return false;
        }
    }

    static function editarPost($data){
        $post = Post::find($data["id"]);

        if($post != null){

            $post->user_id = $data["user_id"];

            // Control de almacenaje de ficheros
            $uploadPath = public_path('imagenes');
            if(!file_exists($uploadPath)){
                mkdir($uploadPath, 0777, true);
            }

            if(isset($data["multimedia"])){
                $imageName = time() . '.' . $data["multimedia"]->getClientOriginalExtension();
                $data["multimedia"]->move($uploadPath, $imageName);
                $post->multimedia = asset('imagenes/'. basename($imageName));   
            }

            $post->texto = $data["texto"];
            $post->save();

            return true;
        }else{
            return false;
        }
    }

    static function getAllPostsDeUsuario($idUsuario){
        $posts = Post::where('user_id',$idUsuario)->get();
        return $posts;
    }
}
