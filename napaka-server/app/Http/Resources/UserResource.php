<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;
    
    public function toArray($request): array
    {
        if($this->id == null){
            return[
                'nombre' => $this->nombre,
                'email' => $this->email,
                'biografia' => $this->biografia,
                'foto_perfil' => $this->foto_perfil,
                'is_administrator' => $this->is_administrator
            ];
        }else{
            return[
                'id' => $this->id,
                'nombre' => $this->nombre,
                'email' => $this->email,
                'biografia' => $this->biografia,
                'foto_perfil' => $this->foto_perfil,
                'is_administrator' => $this->is_administrator
            ];
        }
    }
}
