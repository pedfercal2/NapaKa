<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;
    
    public function toArray($request): array
    {
        return[
            'id' => $this->id,
            'nombre' => $this->nombre,
            'email' => $this->email,
            'biografia' => $this->biografia,
            'foto_perfil' => $this->foto_perfil
        ];
    }
}
