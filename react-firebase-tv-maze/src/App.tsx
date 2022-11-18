//Imports node-module
import React, {useEffect, useState} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Imports Service
import { isUserConneted } from './_service/firebase/firebaseAuth.service'
import { takeFavorite } from './_service/firebase/firebasesDb.service';

//Imports Components
import ProtectedRoute from './components/protectedPage/protectedPage.component';
import Register from './pages/register/register.page'
import Detail, { loader as dataLoader } from './pages/detail/detail.page'
import Search from './pages/search/search.page'
import Favorite, { loader as favoriteLoader} from './pages/favorite/favorite.component';
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
    element: <Search /> 
  },
  {
    path: '/search/:id',
    element: <Detail />,
    loader: dataLoader
  },
  {
    path: '/favorites',
    element:  <Favorite />,
    loader: favoriteLoader
  },
  {
    path: '*',
    element: <>404, Not Found</>
  }
])
function App() {


  return (
    <div className='darkTheme'>
      <BubblyContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
