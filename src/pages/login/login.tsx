import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from '../../services/store';
import { loginUser } from '../../services/user/slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom'; // добавлено
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: Location })?.from?.pathname || '/';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      navigate(from, { replace: true });
    } else {
      console.error('Ошибка входа');
    }
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
