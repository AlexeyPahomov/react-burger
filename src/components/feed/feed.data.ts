import type { TOrderCardProps } from './components/order-card/order-card';

const IMG_BUN = 'https://code.s3.yandex.net/react/code/bun-02.png';
const IMG_MAIN = 'https://code.s3.yandex.net/react/code/meat-03.png';
const IMG_SAUCE = 'https://code.s3.yandex.net/react/code/sauce-03.png';
const IMG_CHEESE = 'https://code.s3.yandex.net/react/code/cheese.png';
const IMG_CORE = 'https://code.s3.yandex.net/react/code/sp_1.png';

export const FEED_ORDERS: TOrderCardProps[] = [
  {
    orderNumber: '034534',
    timeLabel: 'Сегодня, 13:20',
    name: 'Interstellar бургер',
    ingredients: [
      {
        id: '60d3463f7034a000269f45e7',
        image: IMG_BUN,
        name: 'Краторная булка N-200i',
        price: 200,
      },
      {
        id: '60d3463f7034a000269f45ea',
        image: IMG_MAIN,
        name: 'Биокотлета из марсианской Магнолии',
        price: 320,
      },
      {
        id: '60d3463f7034a000269f45e9',
        image: IMG_SAUCE,
        name: 'Соус Spicy-X',
        price: 90,
      },
      {
        id: '60d3463f7034a000269f45eb',
        image: IMG_CHEESE,
        name: 'Сыр с астероидной плесенью',
        price: 75,
      },
      {
        id: '60d3463f7034a000269f45ec',
        image: IMG_CORE,
        name: 'Минеральные кольца',
        price: 110,
      },
      {
        id: '60d3463f7034a000269f45ed',
        image: IMG_SAUCE,
        name: 'Соус фирменный Space Sauce',
        price: 95,
      },
      {
        id: '60d3463f7034a000269f45ee',
        image: IMG_MAIN,
        name: 'Говяжий метеорит',
        price: 260,
      },
      {
        id: '60d3463f7034a000269f45ef',
        image: IMG_BUN,
        name: 'Краторная булка N-200i',
        price: 200,
      },
    ],
    price: 560,
  },
  {
    orderNumber: '034533',
    timeLabel: 'Сегодня, 12:15',
    name: 'Black Hole Singularity острый бургер',
    ingredients: [
      {
        id: '60d3463f7034a000269f45f1',
        image: IMG_BUN,
        name: 'Флюоресцентная булка R2-D3',
        price: 20,
      },
      {
        id: '60d3463f7034a000269f45f2',
        image: IMG_MAIN,
        name: 'Филе Люминесцентного тетраодонтимформа',
        price: 300,
      },
      {
        id: '60d3463f7034a000269f45f3',
        image: IMG_SAUCE,
        name: 'Соус традиционный галактический',
        price: 30,
      },
      {
        id: '60d3463f7034a000269f45f4',
        image: IMG_CORE,
        name: 'Плоды фалленианского дерева',
        price: 80,
      },
      {
        id: '60d3463f7034a000269f45f5',
        image: IMG_BUN,
        name: 'Флюоресцентная булка R2-D3',
        price: 20,
      },
    ],
    price: 510,
  },
  {
    orderNumber: '034532',
    timeLabel: 'Вчера, 22:40',
    name: 'Космический кратор',
    ingredients: [
      { id: '60d3463f7034a000269f45f6', image: IMG_BUN, name: 'Булка', price: 100 },
      { id: '60d3463f7034a000269f45f7', image: IMG_CHEESE, name: 'Сыр', price: 90 },
      { id: '60d3463f7034a000269f45f8', image: IMG_MAIN, name: 'Котлета', price: 130 },
      { id: '60d3463f7034a000269f45f9', image: IMG_CORE, name: 'Кольца', price: 80 },
      { id: '60d3463f7034a000269f45fa', image: IMG_SAUCE, name: 'Соус', price: 60 },
      {
        id: '60d3463f7034a000269f45fb',
        image: IMG_MAIN,
        name: 'Доп. котлета',
        price: 130,
      },
    ],
    price: 890,
  },
  {
    orderNumber: '034501',
    timeLabel: 'Вчера, 18:02',
    name: 'Метеоритный дуэт',
    ingredients: [
      { id: '60d3463f7034a000269f45fc', image: IMG_BUN, name: 'Булка', price: 90 },
      { id: '60d3463f7034a000269f45fd', image: IMG_MAIN, name: 'Котлета', price: 130 },
      { id: '60d3463f7034a000269f45fe', image: IMG_BUN, name: 'Булка', price: 90 },
    ],
    price: 310,
  },
  {
    orderNumber: '034498',
    timeLabel: '2 дня назад, 09:12',
    name: 'Звёздный чизбургер',
    ingredients: [
      { id: '60d3463f7034a000269f45ff', image: IMG_BUN, name: 'Булка', price: 100 },
      { id: '60d3463f7034a000269f4600', image: IMG_CHEESE, name: 'Сыр', price: 90 },
      { id: '60d3463f7034a000269f4601', image: IMG_MAIN, name: 'Котлета', price: 130 },
      { id: '60d3463f7034a000269f4602', image: IMG_SAUCE, name: 'Соус', price: 70 },
      {
        id: '60d3463f7034a000269f4603',
        image: IMG_CHEESE,
        name: 'Сыр плавленый',
        price: 85,
      },
    ],
    price: 475,
  },
];

export const FEED_BOARD_MOCK = {
  readyOrderNumbers: ['034533', '034532', '034530', '034527', '034525'],
  inProgressOrderNumbers: ['034538', '034541', '034542'],
  totalCompleted: 28_752,
  completedToday: 138,
};
