//Import Navigate to change url
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';


const ProtectedRoute = ({user, children }:any) => {

    if (!user) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };

  export default ProtectedRoute;