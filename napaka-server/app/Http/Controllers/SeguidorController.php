<?php

namespace App\Http\Controllers;

use App\Models\Seguidor;
use App\Http\Requests\StoreSeguidorRequest;
use App\Http\Requests\UpdateSeguidorRequest;

class SeguidorController extends Controller
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
     * @param  \App\Http\Requests\StoreSeguidorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSeguidorRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Seguidor  $seguidor
     * @return \Illuminate\Http\Response
     */
    public function show(Seguidor $seguidor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Seguidor  $seguidor
     * @return \Illuminate\Http\Response
     */
    public function edit(Seguidor $seguidor)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Seguidor  $seguidor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Seguidor $seguidor)
    {
        //
    }
}
