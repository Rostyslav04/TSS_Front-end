import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/user/login';
import UserGetById from './pages/user/userGetById';
import UserCreate from './pages/user/userCreate';
import UserDelete from './pages/user/userDelete';
import UserGetAll from './pages/user/userGetAll';
import CarGetAll from './pages/car/carGetAll';
import CarGetById from './pages/car/carGetById';
import CarCreate from './pages/car/carCreate';
import CarDelete from './pages/car/carDelete';
import PersonalGetById from './pages/personal/personalGetById';
import PersonalCreate from './pages/personal/personalCreate';
import PersonalDelete from './pages/personal/personalDelete';
import UserToCarGetById from './pages/userToCar/userToCarGetById';
import UserToCarCreate from './pages/userToCar/userToCarCreate';
import UserToCarDelete from './pages/userToCar/userToCarDelete';
import OrderGetById from './pages/order/orderGetById';
import OrderCreate from './pages/order/orderCreate';
import OrderGetAll from './pages/order/orderGetAll';
import OrderDelete from './pages/order/orderDelete';
import PersonalGetAll from './pages/personal/personalGetAll';
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/user/getById',
    element: <UserGetById />,
  },
  {
    path: '/user/create',
    element: <UserCreate />,
  },
  {
    path: '/user/delete',
    element: <UserDelete />,
  },
  {
    path: '/user/getAll',
    element: <UserGetAll />,
  },

  // ----------------------------------------------------------------------
  {
    path: '/car/getAll',
    element: <CarGetAll />,
  },
  {
    path: '/car/getById',
    element: <CarGetById />,
  },
  {
    path: '/car/create',
    element: <CarCreate />,
  },
  {
    path: '/car/delete',
    element: <CarDelete />,
  },

  // ----------------------------------------------------------------------

  {
    path: '/personal/getById',
    element: <PersonalGetById />,
  },
  {
    path: '/personal/create',
    element: <PersonalCreate />,
  },
  {
    path: '/personal/delete',
    element: <PersonalDelete />,
  },
  {
    path: '/personal/getAll',
    element: <PersonalGetAll />,
  },

  // ----------------------------------------------------------------------

  {
    path: '/userToCar/getById',
    element: <UserToCarGetById />,
  },
  {
    path: '/userToCar/create',
    element: <UserToCarCreate />,
  },
  {
    path: '/userToCar/delete',
    element: <UserToCarDelete />,
  },

  // ----------------------------------------------------------------------

  {
    path: '/order/getById',
    element: <OrderGetById />,
  },
  {
    path: '/order/create',
    element: <OrderCreate />,
  },
  {
    path: '/order/delete',
    element: <OrderDelete />,
  },
  {
    path: '/order/getAll',
    element: <OrderGetAll />,
  },

  // ----------------------------------------------------------------------

  {
    path: 'about',
    element: <div>About</div>,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

reportWebVitals();
