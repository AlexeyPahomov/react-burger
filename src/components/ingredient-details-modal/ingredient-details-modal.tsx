import { IngredientDetails } from '@/components/burger-ingredients/components';
import { Modal } from '@/components/modal/modal';
import { useIngredients } from '@/hooks/useIngredients';
import { useNavigate, useParams, useLocation, type Location } from 'react-router-dom';

export const IngredientDetailsModal = (): React.JSX.Element => {
  const { id } = useParams();
  const { getIngredient } = useIngredients();
  const ingredient = getIngredient(id ?? '');

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { modal?: Location } | null;
  const closeModal = (): void => {
    if (state?.modal) {
      navigate(-1) as void;
    } else {
      navigate('/') as void;
    }
  };

  return (
    <Modal title="Детали ингредиента" onClose={() => closeModal()}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  );
};
export default IngredientDetailsModal;
