<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSeguidoRequest extends FormRequest
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'id' => 'required',
            'id_seguido' => 'required|exists:users,id',
            'id_usuario' => 'required|exists:users,id',
            'is_silenciado' => 'required',
            'is_bloqueado' => 'required',
        ];
    }

    public function messages(){
        return [
            'id_seguido.exists' => 'El usuario indicado no existe, por favor ponga un usuario existente.',
            'id_usuario.exists' => "El usuario indicado no existe, por favor ponga un usuario existente.",
            'id_seguido.required' => "Este campo es obligatorio.",
            'id_usuario' => "Este campo es obligatorio."
        ];
    }
}
