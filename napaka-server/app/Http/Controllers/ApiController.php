<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\User;
use Laravel\Sanctum\PersonalAccessToken;

class ApiController extends Controller
{
    // Gestion de inicio
    public function index(Request $request){
        $users = User::all();
        $logo = asset('imagenes/logo.png');
        $token = PersonalAccessToken::findToken($request["token"]);
        $usuario = $token->tokenable;

        // Consigo la información necesaria para visualizar un post, a falta de cantidad de likes
        $infoSeguidos = User::select('posts.id as post_id', 'posts.user_id as post_user_id', 'posts.multimedia', 'posts.texto', 'users.nombre', 'users.id as users_id', 'users.foto_perfil')
            ->rightjoin('seguidos','seguidos.id_seguido', 'users.id')
            ->where('seguidos.id_usuario', $usuario->id)
            ->where('seguidos.is_silenciado', 0)->where('seguidos.is_bloqueado',0)
            ->join('posts', 'posts.user_id','users.id')
            ->get();

        // Consigo información básica de los posts de el usuario
        $infoSelf = User::select('posts.id', 'posts.multimedia', 'posts.texto')
            ->join('posts', 'posts.user_id','users.id')
            ->where('posts.user_id', $usuario->id)->get();

            $misPosts = Post::where('user_id',$request["id"])->get();

        return response()->json([
            'users' => $users,
            'logo' => $logo,
            'user' => $usuario,
            'misPosts' => $misPosts,
        ]);
    }
}
