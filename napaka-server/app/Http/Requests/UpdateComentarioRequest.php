<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateComentarioRequest extends FormRequest
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
            'id' => "required",
            'user_id' => 'required|exists:users,id',
            'post_id' => 'required|exists:posts,id',
            'texto' => 'required|string|max:255|min:1',
            'multimedia' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ];
    }

    // Mensajes de error
    public function messages(){
        return [
            'user_id.exists' => 'El usuario indicado no existe, por favor ponga un usuario existente.',
            'user_id.required' => "Este campo es obligatorio.",
            'post_id.exists' => 'El post indicado no existe, por favor ponga un post existente.',
            'post_id.required' => "Este campo es obligatorio.",
            'texto.required' => "Este campo es obligatorio.",
            'texto.string' => "Este campo debe ser una cadena de texto.",
            'texto.max' => "Este texto no puede ocupar más de 255 caracteres.",
            'texto.min' => "Este texto no puede ser tan pequeño.",
            'multimedia' => "Ha habido un error con la imagen, asegurese de que su formato es correcto(jpeg, png o jpg) y que no ocupa demasiado.",
        ];
    }
}
