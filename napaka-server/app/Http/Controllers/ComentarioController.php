<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use App\Http\Requests\StoreComentarioRequest;
use App\Http\Requests\UpdateComentarioRequest;
use App\Http\Resources\ComentarioResource;
use Illuminate\Validation\ValidationException;

class ComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ComentarioResource::collection(
            Comentario::query()->orderBy('id','desc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreComentarioRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreComentarioRequest $request)
    {
        $data = $request->validated();
        
        if($comentario = Comentario::crearComentario($data)){
            return response()->json([
            'comentario' => $comentario,
            'status' => 201
            ]);
        }else{
            throw ValidationException::withMessages(['error' => 'Este usuario ya ha comentado en el post.']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comentario  $comentario
     * @return \Illuminate\Http\Response
     */
    public function show(Comentario $comentario)
    {
        return new ComentarioResource($comentario);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateComentarioRequest  $request
     * @param  \App\Models\Comentario  $comentario
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateComentarioRequest $request, Comentario $comentario)
    {
        $data = $request->validated();

        $comentario = Comentario::find($data['id']);
        $comentario->editarComentario($data);
        return response()->json([
            'comentario' => $comentario,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comentario  $comentario
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comentario $comentario)
    {
        if(Comentario::deleteComentario($comentario->id)){
            return response('',204);   
        }else{
            return response()->json([
                "Error" => "Error en el servidor, vuelva a intentarlo.",
            ]);
        }
    }

    public function getOne($id){
        return response()->json(Comentario::find($id)->get());
    }
}
