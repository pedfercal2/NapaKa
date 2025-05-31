<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SeguidorResource extends JsonResource
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
                    'id_seguidor' => $this->id_seguidor,
                    'id_usuario' => $this->id_usuario,
                ];
        }else{
                return[
                    'id' => $this->id,
                    'id_seguidor' => $this->id_seguidor,
                    'id_usuario' => $this->id_usuario,
                ];
        }
    }
}
