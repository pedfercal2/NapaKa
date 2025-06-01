<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Http\Requests\StoreLikeRequest;
use App\Http\Requests\UpdateLikeRequest;
use App\Http\Resources\LikeResource;
use Illuminate\Validation\ValidationException;

// Controlador de likes, para descripción mas detallada de las funciones mirad el controlador de usuario
class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return LikeResource::collection(
            Like::query()->orderBy('id','desc')->get()
        ); 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreLikeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreLikeRequest $request)
    {
        $data = $request->validated();
        if(Like::crearLike($data)){
            return response()->json([
                'status' => 201
            ]);
        }else{
            throw ValidationException::withMessages(['error' => 'Este usuario ya ha dado like a ese mismo post.']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Like $like)
    {
        return new LikeResource($like);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateLikeRequest  $request
     * @param  \App\Models\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateLikeRequest $request, Like $like)
    {
        $data = $request->validated();

        if($like->editarLike($data)){
            return response()->json([
                'like' => $like,
            ]);
        }else{
            throw ValidationException::withMessages(['error' => 'Este usuario ya ha dado like a ese mismo post.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function destroy(Like $like)
    {
        if(Like::deleteLike($like->id)){
            return response('',204);   
        }else{
            return response()->json([
                "Error" => "Error en el servidor, vuelva a intentarlo.",
            ]);
        }
    }
}
