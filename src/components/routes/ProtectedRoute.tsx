import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Preloader } from '@ui';
import {
  selectIsAuthenticated,
  selectIsUserChecked
} from '../../services/Selectors/Selectors';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isUserChecked = useSelector(selectIsUserChecked);

  const location = useLocation();

  if (onlyUnAuth && isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (!isUserChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return children;
};
