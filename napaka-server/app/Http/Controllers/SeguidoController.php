<?php

namespace App\Http\Controllers;

use App\Models\Seguido;
use App\Http\Requests\StoreSeguidoRequest;
use App\Http\Requests\UpdateSeguidoRequest;
use App\Http\Resources\SeguidoResource;
use Illuminate\Validation\ValidationException;

// Controlador de seguidos, para descripción mas detallada de las funciones mirad el controlador de usuario
class SeguidoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SeguidoResource::collection(
            Seguido::query()->orderBy('id','desc')->get()
        ); 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSeguidoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSeguidoRequest $request)
    {
        $data = $request->validated();
        if(Seguido::seguir($data)){
            return response()->json([
                'status' => 201
            ]);
        }else{
            throw ValidationException::withMessages(['error' => 'Este usuario ya sigue a esta cuenta.']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Seguido  $seguido
     * @return \Illuminate\Http\Response
     */
    public function show(Seguido $seguido)
    {
        return new SeguidoResource($seguido);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSeguidoRequest  $request
     * @param  \App\Models\Seguido  $seguido
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSeguidoRequest $request, Seguido $seguido)
    {
        $data = $request->validated();

        if($seguido->editarSeguido($data)){
            return response()->json([
                'seguido' => $seguido,
            ]);
        }else{
            throw ValidationException::withMessages(['error' => 'Este usuario ya sigue a esta cuenta.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Seguido  $seguido
     * @return \Illuminate\Http\Response
     */
    public function destroy(Seguido $seguido)
    {
        if(Seguido::deleteSeguido($seguido->id)){
            return response('',204);   
        }else{
            return response()->json([
                "Error" => "Error en el servidor, vuelva a intentarlo.",
            ]);
        }
    }
}
