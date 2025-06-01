<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SeguidoController;
use App\Http\Controllers\SeguidorController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Grupo de rutas que requieren validación del token de usuario
Route::middleware('auth:sanctum')->group(function() {
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // NOTA: LAS PETICIONES DE EDITAR ESTAN TODAS CON POST POR UN ERROR CONOCIDO DE LARAVEL AL GESTIONAR OBJETOS FORMDATA, LOS CUALES NECESITO USAR PARA GUARDAR IMAGENES

    // Rutas de usuario
    Route::post('/users/ver', [UserController::class, 'index']);
    Route::post('/user/editar', [UserController::class, 'update']);
    Route::apiResource('/users', UserController::class);

    // Rutas de posts
    Route::post('/posts/ver', [PostController::class, 'index']);
    //Debe ser POST, si no da problemas al pasar un formData desde el cliente, es un error conocido de request en laravel
    Route::apiResource('/post', PostController::class);
    Route::post('/post/get-one', [PostController::class, 'getOne']);
    Route::post('/post/editar', [PostController::class, 'update']);

    // Rutas de likes
    Route::post('/likes/ver', [LikeController::class, 'index']);
    Route::post('/like/editar', [LikeController::class, 'update']);
    Route::post('/like/crear', [LikeController::class, 'store']);
    Route::apiResource('/like', LikeController::class);
    
    // Rutas de seguidores toDO
    Route::post('/seguidores/ver', [SeguidorController::class, 'index']);
    Route::post('/seguidor/editar', [SeguidorController::class, 'update']);
    Route::post('/seguidor/crear', [SeguidorController::class, 'store']);
    Route::apiResource('/seguidor', SeguidorController::class);

    // Rutas de seguidos
    Route::post('/seguidos/ver', [SeguidoController::class, 'index']);
    Route::post('/seguido/editar', [SeguidoController::class, 'update']);
    Route::post('/seguido/crear', [SeguidoController::class, 'store']);
    Route::apiResource('/seguido', SeguidoController::class);

    // Rutas de comentarios
    Route::post('/comentarios/ver', [ComentarioController::class, 'index']);
    Route::post('/comentario/editar', [ComentarioController::class, 'update']);
    Route::apiResource('/comentario', ComentarioController::class);
    Route::post('/comentario/get-one', [ComentarioController::class, 'getOne']);

    // Get de inicio
    Route::post('/index', [ApiController::class, 'index']);
});

// Rutas que no requieren de token de validación
Route::post('/login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);