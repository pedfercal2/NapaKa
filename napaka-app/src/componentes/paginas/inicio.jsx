import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";
function inicio(){
    const {user, token, logo, setUser, setToken, setLogo} = useStateContext();

    useEffect(() => {
        getUsers();
        getSeguidores();
        getSeguidos();
        getPostsSeguidos();
        getPostsMios();
    }, [])

    const getUsers = () => {
      console.log(user);
        const data = {
          user: user
        };
        axiosClient.post('/users/get', data)
        .then(({data}) => {
            
            setUsers(data.data)
        })
        .catch(() => {
            
        })
    }

    const getSeguidores = () => {
      console.log(user);
        const data = {
          user: user
        };
        axiosClient.post('/users/ver', data)
        .then(({data}) => {
            
            setUsers(data.data)
        })
        .catch(() => {
            
        })
    }

    const getSeguidos = () => {
      console.log(user);
        const data = {
          user: user
        };
        axiosClient.post('/users/ver', data)
        .then(({data}) => {
            
            setUsers(data.data)
        })
        .catch(() => {
            
        })
    }

    const getPostsSeguidos = () => {
      console.log(user);
        const data = {
          user: user
        };
        axiosClient.post('/users/ver', data)
        .then(({data}) => {
            
            setUsers(data.data)
        })
        .catch(() => {
            
        })
    }

    const getPostsMios = () => {
      console.log(user);
        const data = {
          user: user
        };
        axiosClient.post('/users/ver', data)
        .then(({data}) => {
            setUsers(data.data)
        })
        .catch(() => {
            
        })
    }

    return (
        <>ILLO</>
    )
}

export default inicio;