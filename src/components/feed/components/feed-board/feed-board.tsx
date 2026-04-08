import styles from './feed-board.module.css';

type TFeedBoardProps = {
  readyOrderNumbers: string[];
  inProgressOrderNumbers: string[];
  totalCompleted: number;
  completedToday: number;
};

const formatStat = (value: number): string =>
  new Intl.NumberFormat('ru-RU').format(value).replace(/\u00A0/g, ' ');

export const FeedBoard = ({
  readyOrderNumbers,
  inProgressOrderNumbers,
  totalCompleted,
  completedToday,
}: TFeedBoardProps): React.JSX.Element => {
  return (
    <div className={styles.board} aria-label="Статистика заказов">
      <div className={styles.status_row}>
        <div className={styles.status_column}>
          <p className={`${styles.status_title} text text_type_main-medium`}>Готовы:</p>
          <ul className={styles.order_list}>
            {readyOrderNumbers.map((num) => (
              <li key={num}>
                <p
                  className={`text text_type_digits-default ${styles.order_num} ${styles.order_num_ready}`}
                >
                  {num}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.status_column}>
          <p className={`${styles.status_title} text text_type_main-medium`}>
            В работе:
          </p>
          <ul className={styles.order_list}>
            {inProgressOrderNumbers.map((num) => (
              <li key={num}>
                <p
                  className={`text text_type_digits-default ${styles.order_num} ${styles.order_num_progress}`}
                >
                  {num}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className={styles.block_offset}>
        <h2 className={`${styles.stat_heading} text text_type_main-medium`}>
          Выполнено за всё время:
        </h2>
        <p className={`${styles.stat_value} text text_type_digits-large`}>
          {formatStat(totalCompleted)}
        </p>
      </section>

      <section className={styles.block_offset}>
        <h2 className={`${styles.stat_heading} text text_type_main-medium`}>
          Выполнено за сегодня:
        </h2>
        <p className={`${styles.stat_value} text text_type_digits-large`}>
          {formatStat(completedToday)}
        </p>
      </section>
    </div>
  );
};

export default FeedBoard;
