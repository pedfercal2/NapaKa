<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seguido extends Model
{
    // TODO linkar que al seguir a alguien salga en la tabla de seguidores de esa persona

    use HasFactory;

    protected $table = "seguidos";

    protected $fillable = ['id_seguido', 'id_usuario', 'is_bloqueado', 'is_silenciado'];

    static function getAllSeguidos(){
        $seguidos = Seguido::all();
        return $seguidos;
    }

    static function seguir($userId, $idSeguido, $isBloqueado,$isSilenciado){
        $seguido = new Seguido;
        $seguido->id_seguido = $idSeguido;
        $seguido->id_usuario = $userId;
        $seguido->is_bloqueado = $isBloqueado;
        $seguido->is_silenciado = $isSilenciado;
        $seguido->save();
    }

    static function dejarDeSeguir($userId, $idSeguido){
        $seguido = Seguido::where('id_usuario', $userId)->where('id_seguido',$idSeguido);
        if($seguido != null){
            $seguido->delete();
            return true;
        }else{
            return false;
        }
    }

    static function bloquear($userId, $idBloqueado){
        if(Seguido::isSeguido($userId, $idBloqueado)){
            $seguido = Seguido::where('id_usuario', $userId)->where('id_seguido',$idBloqueado)->update(['is_bloqueado' => true]);
        }else{
            Seguido::seguir($userId, $idBloqueado, true, false);
        }
    }

    static function silenciar($userId, $idSilenciado){
        if(Seguido::isSeguido($userId, $idSilenciado)){
            $seguido = Seguido::where('id_usuario', $userId)->where('id_seguido',$idSilenciado)->update(['is_silenciado' => true]);
        }else{
            Seguido::seguir($userId, $idSilenciado, true, false);
        }
    }

    static function isSeguido($userId, $idSeguido){
        $seguidos = Seguido::where('id_usuario', $userId)->where('id_seguido', $idSeguido)->get();

        if(count($seguidos) > 0){
            return true;
        }else{
            return false;
        }
    }

    static function getAllSeguidosDeUsuario($idUsuario){
        $seguidos = Seguido::where('id_usuario',$idUsuario)->get();
        return $seguidos;
    }
}
