import { Modal } from './modal';

import { OrderInfo } from '../order-info';

import { useParams, useNavigate } from 'react-router-dom';

export const OrderModal = ({ children }: { children: React.ReactNode }) => {
  const { number } = useParams();
  const navigate = useNavigate();
  return (
    <Modal title={`#${number}`} onClose={() => navigate(-1)}>
      {children}
    </Modal>
  );
};
