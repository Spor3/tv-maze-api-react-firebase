//Imports node-module
import React, { useContext, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Imports redux
import { useAppSelector } from './app/hooks';
import { selectTheme } from './features/theme/themeSlice';
import { selectSecondaryColor } from "./features/secondaryColor/secondaryColor";

//Imports Components
import Register from './pages/register/register.page'
import Detail, { loader as dataLoader } from './pages/detail/detail.page'
import Search from './pages/search/search.page'
import Favorite from './pages/favorite/favorite.page';
import { BubblyContainer } from 'react-bubbly-transitions';
import Login from './pages/login/login.page';
import Watching from './pages/watching/watching.page';

//Imports scss
import './App.scss';
import { UserContext } from './hooks/context/UserContext';

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
  },
  {
    path: '/watching',
    element: <Watching />
  },
  {
    path: '*',
    element: <>404, Not Found</>
  }
])
function App() {

  const user = useContext(UserContext)
  const theme = useAppSelector(selectTheme);
  const ReduxSecondaryColor = useAppSelector(selectSecondaryColor)
  
  useEffect(() => {
     if(theme === 'dark')
      document.body.style.backgroundColor = '#110f16';
    else
      document.body.style.backgroundColor = '#f3f5f7'; 
  }, [theme])


  return (
    <div className={`${theme === 'dark'? 'dark-theme':'ligth-theme'} ${ReduxSecondaryColor}`}>
      <BubblyContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
