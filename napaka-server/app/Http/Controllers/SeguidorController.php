<?php

namespace App\Http\Controllers;

use App\Models\Seguidor;
use App\Http\Requests\StoreSeguidorRequest;
use App\Http\Requests\UpdateSeguidorRequest;
use App\Http\Resources\SeguidorResource;
use Illuminate\Validation\ValidationException;

class SeguidorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SeguidorResource::collection(
            Seguidor::query()->orderBy('id','desc')->get()
        ); 
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSeguidorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSeguidorRequest $request)
    {
        $data = $request->validated();
        if(Seguidor::seguir($data)){
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
     * @param  \App\Models\Seguidor  $seguidor
     * @return \Illuminate\Http\Response
     */
    public function show(Seguidor $seguidor)
    {
        return new SeguidorResource($seguidor);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSeguidorRequest  $request
     * @param  \App\Models\Seguidor  $seguidor
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSeguidorRequest $request, Seguidor $seguidor)
    {
        $data = $request->validated();

        if($seguidor->editarSeguidor($data)){
            return response()->json([
                'seguidor' => $seguidor,
            ]);
        }else{
            throw ValidationException::withMessages(['error' => 'Este usuario ya sigue a esta cuenta.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Seguidor  $seguidor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Seguidor $seguidor)
    {
        if(Seguidor::deleteSeguidor($seguidor->id)){
            return response('',204);   
        }else{
            return response()->json([
                "Error" => "Error en el servidor, vuelva a intentarlo.",
            ]);
        }
    }
}
