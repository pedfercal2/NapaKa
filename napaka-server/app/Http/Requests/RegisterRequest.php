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
}
