import styles from './text-link.module.css';

type TextLinkProps = {
  text: string;
  title: string;
  link: string;
};

export const TextLink = ({ text, title, link }: TextLinkProps): React.JSX.Element => {
  return (
    <div className={`mb-4 text text_type_main-default ${styles.text}`}>
      {text}{' '}
      <a href={link} className={styles.link}>
        {title}
      </a>
    </div>
  );
};
export default TextLink;
