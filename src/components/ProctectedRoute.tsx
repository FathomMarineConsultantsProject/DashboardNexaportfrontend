import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  console.log('ProtectedRoute check:', isAuthenticated); // ✅ Debug token flow
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />; // ✅ Renders dashboard layouts dynamically
};

export default ProtectedRoute;