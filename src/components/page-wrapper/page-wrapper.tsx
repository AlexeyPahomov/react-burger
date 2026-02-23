import styles from './page-wrapper.module.css';

type PageWrapperProps = {
  title?: string;
  children?: React.ReactNode;
  extraClass?: string;
};

export const PageWrapper = ({
  title,
  children,
  extraClass,
}: PageWrapperProps): React.JSX.Element => {
  return (
    <div className={`${styles.page} ${extraClass}`}>
      {title && <span className="text text_type_main-medium mb-6">{title}</span>}
      {children}
    </div>
  );
};
export default PageWrapper;
