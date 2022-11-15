//Imports node-module
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Imports Service
import { isUserConneted } from './_service/firebase/firebaseAuth.service'

//Imports Components
import ProtectedRoute from './components/protectedPage/protectedPage.component';
import Register from './pages/register/register.page'
import Detail, { loader as dataLoader } from './pages/detail/detail.page'
import Search from './pages/search/search.page'
import { BubblyContainer } from 'react-bubbly-transitions';
import Login from './pages/login/login.page';

//Imports scss
import './App.scss';
import MyNavbar from './components/navbar/navbar.component';


isUserConneted();

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <ProtectedRoute user={localStorage.getItem('user')}><Search /></ProtectedRoute>
  },
  {
    path: '/search/:id',
    element: <ProtectedRoute user={localStorage.getItem('user')}><Detail /></ProtectedRoute>,
    loader: dataLoader
  },
  {
    path: '/favorites',
    element: <ProtectedRoute user={localStorage.getItem('user')}><MyNavbar user={localStorage.getItem('user')} /><>prefear</></ProtectedRoute>
  },
  {
    path: '*',
    element: <>404, Not Found</>
  }
])

function App() {

  return (
    <>
      <BubblyContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
