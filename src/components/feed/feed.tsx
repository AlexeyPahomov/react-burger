import { FeedBoard } from './components/feed-board/feed-board';
import { OrderCard, type TOrderCardProps } from './components/order-card/order-card';

import styles from './feed.module.css';

const IMG_BUN = 'https://code.s3.yandex.net/react/code/bun-02.png';
const IMG_MAIN = 'https://code.s3.yandex.net/react/code/meat-03.png';
const IMG_SAUCE = 'https://code.s3.yandex.net/react/code/sauce-03.png';
const IMG_CHEESE = 'https://code.s3.yandex.net/react/code/cheese.png';
const IMG_CORE = 'https://code.s3.yandex.net/react/code/sp_1.png';

const orders: TOrderCardProps[] = [
  {
    orderNumber: '034534',
    timeLabel: 'Сегодня, 13:20',
    name: 'Interstellar бургер',
    ingredients: [
      { id: '1', image: IMG_BUN, name: 'Краторная булка N-200i' },
      { id: '2', image: IMG_MAIN, name: 'Биокотлета из марсианской Магнолии' },
      { id: '3', image: IMG_SAUCE, name: 'Соус Spicy-X' },
      { id: '4', image: IMG_CHEESE, name: 'Сыр с астероидной плесенью' },
      { id: '5', image: IMG_CORE, name: 'Минеральные кольца' },
      { id: '6', image: IMG_SAUCE, name: 'Соус фирменный Space Sauce' },
      { id: '7', image: IMG_MAIN, name: 'Говяжий метеорит' },
      { id: '8', image: IMG_BUN, name: 'Краторная булка N-200i' },
    ],
    price: 560,
  },
  {
    orderNumber: '034533',
    timeLabel: 'Сегодня, 12:15',
    name: 'Galaxy бургер',
    ingredients: [
      { id: '1', image: IMG_BUN, name: 'Булка' },
      { id: '2', image: IMG_MAIN, name: 'Котлета' },
      { id: '3', image: IMG_SAUCE, name: 'Соус' },
    ],
    price: 420,
  },
  {
    orderNumber: '034532',
    timeLabel: 'Вчера, 22:40',
    name: 'Космический кратор',
    ingredients: [
      { id: '1', image: IMG_BUN, name: 'Булка' },
      { id: '2', image: IMG_CHEESE, name: 'Сыр' },
      { id: '3', image: IMG_MAIN, name: 'Котлета' },
      { id: '4', image: IMG_CORE, name: 'Кольца' },
      { id: '5', image: IMG_SAUCE, name: 'Соус' },
      { id: '6', image: IMG_MAIN, name: 'Доп. котлета' },
    ],
    price: 890,
  },
  {
    orderNumber: '034501',
    timeLabel: 'Вчера, 18:02',
    name: 'Метеоритный дуэт',
    ingredients: [
      { id: '1', image: IMG_BUN, name: 'Булка' },
      { id: '2', image: IMG_MAIN, name: 'Котлета' },
      { id: '3', image: IMG_BUN, name: 'Булка' },
    ],
    price: 310,
  },
  {
    orderNumber: '034498',
    timeLabel: '2 дня назад, 09:12',
    name: 'Звёздный чизбургер',
    ingredients: [
      { id: '1', image: IMG_BUN, name: 'Булка' },
      { id: '2', image: IMG_CHEESE, name: 'Сыр' },
      { id: '3', image: IMG_MAIN, name: 'Котлета' },
      { id: '4', image: IMG_SAUCE, name: 'Соус' },
      { id: '5', image: IMG_CHEESE, name: 'Сыр плавленый' },
    ],
    price: 475,
  },
];

const FEED_BOARD_MOCK = {
  readyOrderNumbers: ['034533', '034532', '034530', '034527', '034525'],
  inProgressOrderNumbers: ['034538', '034541', '034542'],
  totalCompleted: 28_752,
  completedToday: 138,
};

export const Feed = (): React.JSX.Element => {
  return (
    <div className={styles.page}>
      <h1 className="text text_type_main-large mb-6">Лента заказов</h1>
      <div className={`${styles.feed_row}`}>
        <div className={`${styles.cards_column}`}>
          <ul className={`custom-scroll ${styles.cards} mr-2`}>
            {orders.map((order) => (
              <li key={order.orderNumber} className={`${styles.card_row}`}>
                <OrderCard
                  orderNumber={order.orderNumber}
                  timeLabel={order.timeLabel}
                  name={order.name}
                  ingredients={order.ingredients}
                  price={order.price}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.board_slot}`}>
          <FeedBoard
            readyOrderNumbers={FEED_BOARD_MOCK.readyOrderNumbers}
            inProgressOrderNumbers={FEED_BOARD_MOCK.inProgressOrderNumbers}
            totalCompleted={FEED_BOARD_MOCK.totalCompleted}
            completedToday={FEED_BOARD_MOCK.completedToday}
          />
        </div>
      </div>
    </div>
  );
};

export default Feed;
