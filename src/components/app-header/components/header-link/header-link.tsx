import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

import styles from './header-link.module.css';

type THeaderLinkProps = {
  title: string;
  to: string;
  icon: 'burger' | 'list' | 'profile';
  extraClass?: string;
};

const iconMap = {
  burger: BurgerIcon,
  list: ListIcon,
  profile: ProfileIcon,
};

export const HeaderLink = ({
  title,
  to,
  icon,
  extraClass,
}: THeaderLinkProps): React.JSX.Element => {
  const IconComponent = iconMap[icon];

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.link} ${extraClass} ${isActive ? styles.link_active : ''}`
      }
    >
      {({ isActive }) => (
        <>
          <IconComponent type={isActive ? 'primary' : 'secondary'} />
          <p className="text text_type_main-default ml-2">{title}</p>
        </>
      )}
    </NavLink>
  );
};
export default HeaderLink;
