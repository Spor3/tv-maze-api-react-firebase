//Imports node-module
import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

//Imports Service


//Imports Components
import ProtectedRoute from './components/protectedPage/protectedPage.component';
import  Register  from './pages/register/register.page'
import { Container } from 'react-bootstrap';

//Imports scss
import './App.scss';

function App() {
  
  const router = createBrowserRouter([
    {
     path: '/login',
     element: <>login</>},
    {
     path: '/register',
     element: <Register/>
     },
    {
     path: '/search',
     element: <ProtectedRoute user={'ciao'}><div>search</div></ProtectedRoute>
     },
     {
      path: '/',
      element: <ProtectedRoute user={'ciao'}><>search</></ProtectedRoute>
      },
    {
     path: '/search/:id',
     element: <>detail</>
     },
    {
     path: '/prefear',
     element: <>prefear</>
     },
    {
      path:'*',
      element:<>404, Not Found</>
     }
  ])

  return( 
    <Container>
      <RouterProvider router={router}/>
    </Container>
  );
}

export default App;
