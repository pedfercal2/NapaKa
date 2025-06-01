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
        // Consigo todos los comentarios, ordenados por id de forma descendiente
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
    // llamada al crear un nuevo comentario
    public function store(StoreComentarioRequest $request)
    {
        // Esta linea valida los datos, es usado en todos los apartados en donde se recive información del cliente, las validaciones están en la carpeta ../Request y se usa la que se pasa por parámetro
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
    // Editar comentario
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
    // Eliminar comentario
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

    // Conseguir un unico comentario, dada su id
    public function getOne($id){
        return response()->json(Comentario::find($id)->get());
    }
}
