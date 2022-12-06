//Import Navigate to change url
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../hooks/context/UserContext';


const ProtectedRoute = ({ children }:any) => {

  const user:any = useContext(UserContext);

  if(user.isLoading && !user.user){
    return <>Loading...</>
  }

    if (!user.user && !user.isLoading ) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };

  export default ProtectedRoute;