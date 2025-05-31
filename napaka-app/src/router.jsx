import { createBrowserRouter } from "react-router-dom";
import Login from "./componentes/paginas/login";
import Register from "./componentes/paginas/register";
import GuestLayout from "./componentes/GuestLayout";
import Users from "./componentes/paginas/users";
import Posts from "./componentes/paginas/posts";
import Likes from "./componentes/paginas/likes";
import Seguidores from "./componentes/paginas/seguidores";
import Seguidos from "./componentes/paginas/seguidos";
import Comentarios from "./componentes/paginas/comentarios";
import DefaultLayout from "./componentes/DefaultLayout";
import UserForm from "./componentes/paginas/userForm";
import PostForm from "./componentes/paginas/postForm";
import LikesForm from "./componentes/paginas/likesForm";
import SeguidoresForm from "./componentes/paginas/seguidoresForm";
import SeguidosForm from "./componentes/paginas/seguidosForm";
import Inicio from "./componentes/paginas/inicio";
import ComentariosForm from "./componentes/paginas/comentariosForm";

const router = createBrowserRouter ([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="UserCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="UserUpdate"/>
            },
            {
                path: '/posts',
                element: <Posts />
            },
            {
                path: '/posts/new',
                element: <PostForm key="PostCreate"/>
            },
            {
                path: '/post/:id',
                element: <PostForm key="PostsUpdate"/>
            },
            {
                path: '/likes',
                element: <Likes />
            },
            {
                path: '/likes/new',
                element: <LikesForm key="LikesCreate"/>
            },
            {
                path: '/like/:id',
                element: <LikesForm key="LikesUpdate"/>
            },
            {
                path: '/seguidos',
                element: <Seguidos />
            },
            {
                path: '/seguidos/new',
                element: <SeguidosForm key="SeguidosCreate"/>
            },
            {
                path: '/seguido/:id',
                element: <SeguidosForm key="SeguidosUpdate"/>
            },
            {
                path: '/seguidores',
                element: <Seguidores />
            },
            {
                path: '/seguidores/new',
                element: <SeguidoresForm key="SeguidoresCreate"/>
            },
            {
                path: '/seguidor/:id',
                element: <SeguidoresForm key="SeguidoresUpdate"/>
            },
            {
                path: '/comentarios',
                element: <Comentarios />
            },
            {
                path: '/comentarios/new',
                element: <ComentariosForm key="ComentariosCreate"/>
            },
            {
                path: '/comentario/:id',
                element: <ComentariosForm key="ComentariosUpdate"/>
            },
            {
                path: '/inicio',
                element: <Inicio/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
]);

export default router;