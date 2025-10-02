import { ProfileUI } from '@ui-pages';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  selectUser,
  getUser,
  updateUser
} from '../../services/user/slices/authSlice';
export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Загружаем пользователя, если его ещё нет
  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    } else {
      setFormValue((prevState) => ({
        ...prevState,
        name: user.name,
        email: user.email
      }));
    }
  }, [user, dispatch]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
