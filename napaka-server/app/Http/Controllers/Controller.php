<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    // No borro este controlador porque s rompe la estructura de poyecto por tema de herencia y dependencias
    public function inicio(){
        $comentarios = User::deleteUser(1);
        return view("welcome", compact('comentarios'));
    }
}
