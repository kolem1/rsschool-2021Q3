import { SortMode } from '../../enums';
import * as imgs from './images';

export const sortOptions = [
  {
    value: SortMode[1],
    name: 'По имени от А до Я',
  },
  {
    value: SortMode[2],
    name: 'По имени от Я до А',
  },
  {
    value: SortMode[3],
    name: 'По году по возрастанию',
  },
  {
    value: SortMode[4],
    name: 'По году по убыванию',
  },
];

export const shapeChecks = [
  {
    id: 1,
    value: 'шар',
    img: imgs.ball,
  },
  {
    id: 2,
    value: 'колокольчик',
    img: imgs.bell,
  },
  {
    id: 3,
    value: 'шишка',
    img: imgs.cone,
  },
  {
    id: 4,
    value: 'снежинка',
    img: imgs.snowflake,
  },
  {
    id: 5,
    value: 'фигурка',
    img: imgs.toy,
  },
];

export const sizeChecks = [
  {
    id: 1,
    value: 'малый',
    img: imgs.ball,
    mod: 'small',
  },
  {
    id: 2,
    value: 'средний',
    img: imgs.ball,
    mod: 'middle',
  },
  {
    id: 3,
    value: 'большой',
    img: imgs.ball,
    mod: 'big',
  },
];

export const colorChecks = [
  {
    id: 1,
    value: 'белый',
    color: '#ffffff',
  },
  {
    id: 2,
    value: 'желтый',
    color: '#FDD700',
  },
  {
    id: 3,
    value: 'красный',
    color: '#FD0000',
  },
  {
    id: 4,
    value: 'синий',
    color: '#2299EB',
  },
  {
    id: 5,
    value: 'зелёный',
    color: '#08AA05',
  },
];
