import { createBrowserRouter } from "react-router-dom";
import Login from "./componentes/paginas/login";
import Register from "./componentes/paginas/register";
import GuestLayout from "./componentes/GuestLayout";
import Users from "./componentes/paginas/users";
import Posts from "./componentes/paginas/posts";
import DefaultLayout from "./componentes/DefaultLayout";
import UserForm from "./componentes/paginas/userForm";
import PostForm from "./componentes/paginas/postForm";
import Inicio from "./componentes/paginas/inicio";

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