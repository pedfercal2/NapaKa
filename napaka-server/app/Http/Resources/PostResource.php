<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = false;
    public function toArray($request)
    {
        if($this->id == null){
                return[
                    'user_id' => $this->user_id,
                    'texto' => $this->texto,
                    'multimedia' => $this->multimedia,
                ];
            }else{
                return[
                    'id' => $this->id,
                    'user_id' => $this->user_id,
                    'texto' => $this->texto,
                    'multimedia' => $this->multimedia,
                ];
            }
    }
}
