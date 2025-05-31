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

    public $timestamps = false;

    static function getAllSeguidos(){
        $seguidos = Seguido::all();
        return $seguidos;
    }

    static function yaSigueAlUsuario($id_usuario, $id_seguido, $id = null){
        $seguidos = Seguido::where("id_usuario", $id_usuario)->get();

        foreach($seguidos as $seguido){
            if($id == $seguido->id){
                return false;
            }elseif($seguido->id_seguido == $id_seguido && $seguido->id_usuario == $id_usuario){
                return true;
            }
        }

        return false;
    }

    static function seguir($data){
        $seguido = new Seguido;

        if(Seguido::yaSigueAlUsuario($data["id_usuario"], $data["id_seguido"])){
            return false;
        }
        if($data["id_usuario"] == $data["id_seguido"]){
            return false;
        }else{
            $seguido->id_seguido = $data["id_seguido"];
            $seguido->id_usuario = $data["id_usuario"];
        }
        $bloqueado = 0;
        $silenciado = 0;
        if($data["is_bloqueado"] == "true"){
            $bloqueado = 1;
        }
        $seguido->is_bloqueado = $bloqueado;
        if($data["is_silenciado"] == "true"){
            $silenciado = 1;
        }
        $seguido->is_silenciado = $silenciado;
        $seguido->save();
        return true;
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

    static function getAllSeguidosDeUsuario($idUsuario){
        $seguidos = Seguido::where('id_usuario',$idUsuario)->get();
        return $seguidos;
    }

    static function editarSeguido($data){
        $seguido = Seguido::find($data["id"]);

        if(Seguido::yaSigueAlUsuario($data["id_usuario"], $data["id_seguido"],$data["id"])){
            return false;
        }

        if($seguido->id_seguido == $data["id_usuario"] || $seguido->id_usuario == $data["id_seguido"] || $data["id_usuario"] == $data["id_seguido"]){
            return false;
        }else{
            $seguido->id_seguido = $data["id_seguido"];
            $seguido->id_usuario = $data["id_usuario"];
        }
        $bloqueado = 0;
        $silenciado = 0;
        
        if($data["is_bloqueado"] == "true"){
            $bloqueado = 1;
        }

        $seguido->is_bloqueado = $bloqueado;
        
        if($data["is_silenciado"] == "true"){
            $silenciado = 1;
        }
        $seguido->is_silenciado = $silenciado;
        
        $seguido->save();

        return true;
    }
}
