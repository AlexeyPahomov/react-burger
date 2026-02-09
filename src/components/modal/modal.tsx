import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';

import { ModalOverlay } from './components/modal-overlay/modal-overlay';

import styles from './modal.module.css';

type TModalProps = {
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
};

const modalRoot: HTMLElement = document.getElementById('react-modals')!;

export const Modal = ({ title, onClose, children }: TModalProps): React.JSX.Element => {
  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={`pt-15 pb-15 pr-10 pl-10 ${styles.modal}`}>
        <div className={styles.modal_header}>
          {title && <span className="text text_type_main-large">{title}</span>}
          <CloseIcon
            type="primary"
            onClick={onClose}
            className={`${styles.icon_close}`}
          />
        </div>
        <div className={`${styles.modal_content}`}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};
