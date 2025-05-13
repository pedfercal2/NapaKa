<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seguidor extends Model
{

    // TODO linkar que al seguir a alguien salga en la tabla de seguidores de esa persona

    use HasFactory;

    protected $table = "seguidores";

    protected $fillable = ['id_seguidor', 'id_usuario'];

    static function getAllSeguidores(){
        $seguidores = Seguidor::all();
        return $seguidores;
    }

    static function crearSeguidor($idSeguidor, $idUsuario){
        $seguidor = new Seguidor;
        $seguidor->id_seguidor = $idSeguidor;
        $seguidor->id_usuario = $idUsuario;
        $seguidor->save();
    }

    static function eliminarSeguidor($idSeguidor, $idUsuario){
        $seguidor = Seguidor::where('id_usuario', $idUsuario)->where('id_seguidor',$idSeguidor);

        if($seguidor != null){
            $seguidor->delete();
            return true;
        }else{
            return false;
        }
    }

    static function getAllSeguidoresDeUsuario($idUsuario){
        $seguidores = Seguidor::where('id_usuario',$idUsuario)->get();
        return $seguidores;
    }
}
