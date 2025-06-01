<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSeguidorRequest extends FormRequest
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
    // Reglas de validación
    public function rules()
    {
        return [
            'id' => 'required',
            'id_seguidor' => 'required|exists:users,id',
            'id_usuario' => 'required|exists:users,id',
        ];
    }

    // Mensajes de error
    public function messages(){
        return [
            'id_seguidor.exists' => 'El usuario indicado no existe, por favor ponga un usuario existente.',
            'id_usuario.exists' => "El usuario indicado no existe, por favor ponga un usuario existente.",
            'id_seguidor.required' => "Este campo es obligatorio.",
            'id_usuario' => "Este campo es obligatorio."
        ];
    }
}
