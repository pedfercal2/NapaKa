<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ApiController extends Controller
{
    public function index(){
        $usuarios = User::all();

        return response()->json([
            'usuarios' => $usuarios
        ]);
    }
}
