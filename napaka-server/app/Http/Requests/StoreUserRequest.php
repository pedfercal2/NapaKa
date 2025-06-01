<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
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
            'nombre' => 'required|string|max:255|unique:users,nombre',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
            ],
            'biografia' => 'nullable',
            'fotoPerfil' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'is_administrator' => 'string'
        ];
    }

    // Mensajes de error
    public function messages(){
        return [
            'nombre.required' => 'Este campo es obligatorio.',
            'nombre.unique' => 'Este nombre ya existe, por favor elija otro distinto.',
            'email.required' => "Este campo es obligatorio.",
            'email.unique' => 'Este email ya está en uso, por favor utilice otro distinto.',
            'fotoPerfil' => 'La foto de perfil debe ser una imagen (formatos: jpeg, png, jpg) y no ser demasiado grande.',
            'password.required' => 'La contraseña es obligatoria.',
            'password' => 'La contraseña debe de tener mínimo 8 caracteres y entre ellos debe haber al menos 1 letra.',
        ];
    }
}
