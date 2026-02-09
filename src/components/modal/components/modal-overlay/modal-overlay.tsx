import { useEffect } from 'react';

import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  children?: React.ReactNode;
  onClick?: () => void;
};

export const ModalOverlay = ({
  children,
  onClick,
}: TModalOverlayProps): React.JSX.Element => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget && onClick) {
      onClick();
    }
  };

  useEffect(() => {
    const handleEscPress = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && onClick) {
        onClick();
      }
    };
    document.addEventListener('keydown', handleEscPress);

    return (): void => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, []);

  return (
    <div onClick={handleOverlayClick} className={styles.overlay}>
      {children}
    </div>
  );
};
