<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLikeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    // Reglas de validación
    public function rules()
    {
        return [
            'user_id' => 'required|exists:users,id',
            'post_id' => 'required|exists:posts,id',
        ];
    }

    // Mensajes de error
    public function messages(){
        return [
            'user_id.exists' => 'El usuario indicado no existe, por favor ponga un usuario existente.',
            'user_id.required' => "El id de usuario es necesario.",
            'post_id.required' => "El id de post es necesario.",
            'post_id.exists' => 'El post indicado no existe, por favor ponga un post existente.',
        ];
    }
}
