import React, { useContext } from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Select, ImgCheckbox, ColorCheckbox } from '../UI';
import * as filterParams from './filterRarams';
import './Filter.css';
import { MainContext } from '../../App';
import { copyObj } from '../../utils/index';
import { SearchInput } from '../SearchInput/SearchInput';

export const Filter: React.FC = function () {
  const { filterConfig, setFilterConfig, resetFilter, searchQuery, setSearchQuery, favoriteCount } =
    useContext(MainContext);
  function handleCheckboxChange(param: string, value: string | boolean, isTrue: boolean) {
    if (filterConfig && setFilterConfig) {
      const filterParam = filterConfig.valueFilter[param];
      let newFilterParam: typeof filterParam;
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

      const newFilterConfig = copyObj(filterConfig);
      newFilterConfig.valueFilter[param] = newFilterParam;

      setFilterConfig(newFilterConfig);
    }
  }
  function handleRangeChange(param: string, value: number[]) {
    if (filterConfig && setFilterConfig) {
      const [min, max] = value;

      const filterParam = { ...filterConfig.rangeFilter[param] };
      filterParam.min = min;
      filterParam.max = max;

      const newFilterConfig = copyObj(filterConfig);
      newFilterConfig.rangeFilter[param] = filterParam;

      setFilterConfig(newFilterConfig);
    }
  }

  const countMin = 1;
  const countMax = 12;
  const yearMin = 1940;
  const yearMax = 2020;

  return (
    <div className="filter">
      <div className="filter__column">
        <h2 className="filter-title">Фильтры по значению</h2>
        <div className="filter__item filter-item">
          <h3 className="filter-item__title">Форма:</h3>
          <div className="filter-item__checks">
            {filterParams.shapeChecks.map((check) => {
              return (
                <ImgCheckbox
                  key={check.id}
                  value={check.value}
                  checked={filterConfig?.valueFilter.shape.includes(check.value) || false}
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
            {filterParams.colorChecks.map((check) => {
              return (
                <ColorCheckbox
                  key={check.id}
                  value={check.value}
                  color={check.color}
                  className="filter-item"
                  checked={filterConfig?.valueFilter.color.includes(check.value) || false}
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
            {filterParams.sizeChecks.map((check) => {
              return (
                <ImgCheckbox
                  key={check.id}
                  value={check.value}
                  checked={filterConfig?.valueFilter.size.includes(check.value) || false}
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
                checked={filterConfig?.valueFilter.favorite || false}
                onChange={(event) => {
                  handleCheckboxChange('favorite', filterConfig?.valueFilter.favorite || false, event.target.checked);
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="filter__column">
        <h2 className="filter-title">Фильтры по диапазону</h2>
        <div className="filter__item">
          Количество экземпляров:
          <Range
            min={1}
            max={12}
            value={[filterConfig?.rangeFilter.count.min || countMin, filterConfig?.rangeFilter.count.max || countMax]}
            onChange={(value) => {
              handleRangeChange('count', value);
            }}
          />
        </div>
        <div className="filter__item">
          Год приобритения:
          <Range
            min={1940}
            max={2020}
            step={10}
            value={[filterConfig?.rangeFilter.year.min || yearMin, filterConfig?.rangeFilter.year.max || yearMax]}
            onChange={(value) => {
              handleRangeChange('year', value);
            }}
          />
        </div>
      </div>
      <div className="filter__column">
        <div className="filter__item">
          <h2 className="filter-title">Сортировка</h2>
          <Select
            value={filterConfig?.sortMode || ''}
            onChange={(value: string) => {
              if (filterConfig && setFilterConfig) {
                setFilterConfig({ ...filterConfig, sortMode: value });
              }
            }}
            options={filterParams.sortOptions}
          />
        </div>
        {searchQuery !== undefined && setSearchQuery ? (
          <div className="filter__item">
            <h2 className="filter-title">Поиск</h2>

            <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        ) : (
          ''
        )}
        <button type="button" onClick={resetFilter}>
          Сбросить фильтр
        </button>
        <div className="filter__item">В избранном: {favoriteCount}</div>
      </div>
    </div>
  );
};
