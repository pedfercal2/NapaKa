<?php

use App\Http\Controllers\ApiController;
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

// Ver inicio - sin estar logeado
Route::get('/napaka', [ApiController::class, 'index']);

// Ver inicio - al estar logueado
Route::get('/napaka/{id}', [ApiController::class, 'ver']);

// Ver posts de personas que sigo + mios
Route::get('/napaka/{id}/ver', [ApiController::class, 'ver']);

Route::post('/napaka', [ApiController::class, 'ver']);

// 
Route::put('/napaka/{id}', [ApiController::class, 'ver']);
Route::delete('/napaka/{id}', [ApiController::class, 'ver']);