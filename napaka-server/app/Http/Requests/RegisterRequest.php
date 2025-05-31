<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
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
            'nombre' => 'required|string|max:255|unique:users,nombre',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                Password::min(8)->letters()
            ],
            'fotoPerfil' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ];
    }

    public function messages(){
        return [
            'nombre.required' => 'Este campo es obligatorio.',
            'nombre.unique' => 'Este nombre ya existe, por favor elija otro distinto.',
            'email.required' => "Este campo es obligatorio.",
            'email.unique' => 'Este email ya está en uso, por favor utilice otro distinto.',
            'password.required' => 'La contraseña es obligatoria.',
            'password' => 'La contraseña debe de tener mínimo 8 caracteres y entre ellos debe haber al menos 1 letra.',
            'fotoPerfil' => 'Las imagenes deben ser .jpeg, .png o .jpg y no muy pesadas.',
        ];
    }
}
