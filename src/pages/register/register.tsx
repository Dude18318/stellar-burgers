import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import {
  registerUser,
  selectIsAuthenticated,
  selectAuthError
} from '../../services/user/slices/authSlice';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const error = useSelector(selectAuthError);

  // получаем путь, с которого пользователь пришёл
  const from = (location.state as { from?: Location })?.from?.pathname || '/';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, name: userName }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from); // редирект туда, откуда пришёл пользователь
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
