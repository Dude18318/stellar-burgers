import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../services/Selectors/Selectors';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (onlyUnAuth && isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return children;
};
