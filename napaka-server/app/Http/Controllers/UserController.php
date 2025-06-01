<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        // Consigo todos los usuarios, ordenados por id de forma descendiente
        return UserResource::collection(
            User::query()->orderBy('id','desc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    // llamada al crear un nuevo usuario
    public function store(StoreUserRequest $request)
    {
        // Esta linea valida los datos, es usado en todos los apartados en donde se recive información del cliente, las validaciones están en la carpeta ../Request y se usa del tipo del request que se pasa por parámetro
        $data = $request->validated();
        $user = User::crearUser($data);
        return response()->json([
            'user' => $user,
            'status' => 201
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    // Editar usuario
    public function update(UpdateUserRequest $request)
    {
        
        $data = $request->validated();

        $user = User::find($data['id']);
        $user->editarUser($data);
        return response()->json([
            'user' => $user,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    // Eliminar comentario
    public function destroy(User $user)
    {
        if(User::deleteUser($user->id)){
            return response('',204);   
        }else{
            return response()->json([
                "Error" => "Error en el servidor, vuelva a intentarlo.",
            ]);
        }
    }
}
