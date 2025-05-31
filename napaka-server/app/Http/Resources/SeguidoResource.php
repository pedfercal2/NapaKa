<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SeguidoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        if($this->id == null){
                return[
                    'id' => $this->id,
                    'id_seguido' => $this->id_seguido,
                    'id_usuario' => $this->id_usuario,
                    'is_silenciado' => $this->is_silenciado,
                    'is_bloqueado' => $this->is_bloqueado
                ];
        }else{
                return[
                    'id' => $this->id,
                    'id_seguido' => $this->id_seguido,
                    'id_usuario' => $this->id_usuario,
                    'is_silenciado' => $this->is_silenciado,
                    'is_bloqueado' => $this->is_bloqueado
                ];
        }
    }
}
