import { createBrowserRouter } from "react-router-dom";
import Login from "./componentes/paginas/login";
import Register from "./componentes/paginas/register";
import GuestLayout from "./componentes/GuestLayout";
import Users from "./componentes/paginas/users";
import DefaultLayout from "./componentes/DefaultLayout";

const router = createBrowserRouter ([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/users',
                element: <Users />
            }
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