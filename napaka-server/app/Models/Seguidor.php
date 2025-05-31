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

    public $timestamps = false;

    static function getAllSeguidores(){
        $seguidores = Seguidor::all();
        return $seguidores;
    }

    static function seguir($data){
        $seguidor = new Seguidor;
        if((Seguidor::isSeguidor($data["id_usuario"], $data["id_seguidor"]) || ($data["id_usuario"] == $data["id_seguidor"]))){
            return false;
        }else{
            $seguidor->id_seguidor = $data["id_seguidor"];
            $seguidor->id_usuario = $data["id_usuario"];
        }
        $seguidor->save();
        return true;
    }

    static function deleteSeguidor($id){
        $seguidor = Seguidor::find($id)->delete();
        return true;
    }


    // Funcion que determina si ya se sigue al usuario, para evitar duplicados en la bbdd
    static function isSeguidor($userId, $idSeguidor){
        $seguidores = Seguidor::where('id_usuario', $userId)->where('id_seguidor', $idSeguidor)->get();

        if(count($seguidores) > 0){
            return true;
        }else{
            return false;
        }
    }

    static function getAllSeguidoresDeUsuario($idUsuario){
        $seguidores = Seguidor::where('id_usuario',$idUsuario)->get();
        return $seguidores;
    }

    static function editarSeguidor($data){
        $seguidor = Seguidor::find($data["id"]);

        if(Seguidor::isSeguidor($data["id_usuario"], $data["id_seguidor"])){
            return false;
        }

        if($seguidor->id_seguidor == $data["id_usuario"] || $seguidor->id_usuario == $data["id_seguidor"] || $data["id_usuario"] == $data["id_seguidor"]){
            return false;
        }else{
            $seguidor->id_seguidor = $data["id_seguidor"];
            $seguidor->id_usuario = $data["id_usuario"];
        }
        
        $seguidor->save();

        return true;
    }
}
