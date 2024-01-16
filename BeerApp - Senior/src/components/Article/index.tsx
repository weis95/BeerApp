import styles from './Article.module.css';

interface Props {
    children: React.ReactNode
}

const Article = ({children}: Props) => {
  return (
    <article className={styles.container}>
      {children}
    </article>
  );
};

export default Article;
