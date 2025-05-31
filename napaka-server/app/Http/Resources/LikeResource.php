<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LikeResource extends JsonResource
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
                    'user_id' => $this->user_id,
                    'post_id' => $this->post_id,
                ];
        }else{
                return[
                    'id' => $this->id,
                    'user_id' => $this->user_id,
                    'post_id' => $this->post_id,
                ];
        }
    }
}
