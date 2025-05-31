<?php

namespace App\Http\Controllers;

use App\Models\Seguido;
use App\Http\Requests\StoreSeguidoRequest;
use App\Http\Requests\UpdateSeguidoRequest;

class SeguidoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSeguidoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSeguidoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Seguido  $seguido
     * @return \Illuminate\Http\Response
     */
    public function show(Seguido $seguido)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Seguido  $seguido
     * @return \Illuminate\Http\Response
     */
    public function edit(Seguido $seguido)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Seguido  $seguido
     * @return \Illuminate\Http\Response
     */
    public function destroy(Seguido $seguido)
    {
        //
    }
}
