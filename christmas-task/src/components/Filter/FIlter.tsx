import React from 'react';
import { SortMode } from '../../enums';
import { IFilterConfig } from '../../types';
import { Select } from '../UI/Select/Select';
import * as imgs from './images';
import './Filter.css';
import { ImgCheckbox } from '../UI/ImgCheckbox/ImgCheckbox';
import { ColorCheckbox } from '../UI/ColorCheckbox/ColorCheckbox';

interface IFilterProps {
  filterConfig: IFilterConfig;
  setFilterConfig: (filterConfig: IFilterConfig) => void;
}

export const Filter: React.FC<IFilterProps> = function ({ filterConfig, setFilterConfig }) {
  const sortOptions = [
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

  const shapeChecks = [
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

  const sizeChecks = [
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

  const colorChecks = [
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
      value: 'зеленый',
      color: '#08AA05',
    },
  ];

  function handleCheckboxChange(param: string, value: string | boolean, isTrue: boolean) {
    const filterParam = filterConfig.valueFilter[param];
    let newFilterParam: boolean | string[];
    if (Array.isArray(filterParam)) {
      newFilterParam = [...filterParam];
      if (isTrue) {
        newFilterParam.push(value as string);
      } else {
        newFilterParam = filterParam.filter((item) => item !== value);
      }
    } else {
      newFilterParam = isTrue;
    }

    const newFilterConfig = JSON.parse(JSON.stringify(filterConfig)) as IFilterConfig;
    newFilterConfig.valueFilter[param] = newFilterParam;

    setFilterConfig(newFilterConfig);
  }

  return (
    <div className="filter">
      <div className="filter__column">
        <h2 className="filter-title">Фильтры по значению</h2>
        <div className="filter__item filter-item">
          <h3 className="filter-item__title">Форма:</h3>
          <div className="filter-item__checks">
            {shapeChecks.map((check) => {
              return (
                <ImgCheckbox
                  key={check.id}
                  value={check.value}
                  checked={filterConfig.valueFilter.shape.includes(check.value)}
                  className="filter-item"
                  img={check.img}
                  onChange={(value, isTrue) => {
                    handleCheckboxChange('shape', value, isTrue);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="filter__item filter-item">
          <h3 className="filter-item__title">Цвет:</h3>
          <div className="filter-item__checks">
            {colorChecks.map((check) => {
              return (
                <ColorCheckbox
                  value={check.value}
                  color={check.color}
                  className="filter-item"
                  checked={filterConfig.valueFilter.color.includes(check.value)}
                  onChange={(value, isTrue) => {
                    handleCheckboxChange('color', value, isTrue);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="filter__item filter-item">
          <h3 className="filter-item__title">Размер:</h3>
          <div className="filter-item__checks">
            {sizeChecks.map((check) => {
              return (
                <ImgCheckbox
                  key={check.id}
                  value={check.value}
                  checked={filterConfig.valueFilter.size.includes(check.value)}
                  className="filter-item"
                  img={check.img}
                  imgMod={check.mod}
                  onChange={(value, isTrue) => {
                    handleCheckboxChange('size', value, isTrue);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="filter__item filter-item">
          <h3 className="filter-item__title">Только любимые:</h3>
          <div className="filter-item__checks">
            <label className="filter-item__check">
              <input
                type="checkbox"
                checked={filterConfig.valueFilter.favorite}
                onChange={(event) => {
                  handleCheckboxChange('favorite', filterConfig.valueFilter.favorite, event.target.checked);
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="filter__column">
        <h2 className="filter-title">Фильтры по диапазону</h2>
      </div>
      <div className="filter__column">
        <h2 className="filter-title">Сортировка</h2>
        <Select
          value={filterConfig.sortMode}
          onChange={(value: string) => {
            setFilterConfig({ ...filterConfig, sortMode: value });
          }}
          options={sortOptions}
        />
      </div>
    </div>
  );
};
