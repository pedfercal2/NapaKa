<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        $data = $request->validated();

        if(!Auth::attempt($data)){
            return response([
                'message' => 'El email o la contraseña son incorrectos',
                'data' => $data
            ]);
        }

        $user = Auth::user();

        // Me sale como error en el visual estudio el ->createToken , pero funciona y si que es una función válida, con el plaintextToken devuelve en string el token hasheado
        $token = $user->createToken('main')->plainTextToken;

        //Encuentro el usuario en la base de datos
        $user = User::find($user->id);

        // Envio en formato json al cliente
        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function register(RegisterRequest $request){
        $data = $request->validated();
        
        $user = User::crearUser($data);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request){
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
