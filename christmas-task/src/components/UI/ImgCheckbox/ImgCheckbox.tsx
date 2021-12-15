import React from 'react';

interface IImgCheckbox {
  value: string;
  checked: boolean;
  className: string;
  img: string;
  onChange: (value: string, isTrue: boolean) => void;
  imgMod?: string;
}

export const ImgCheckbox: React.FC<IImgCheckbox> = function ({ value, checked, imgMod, className, img, onChange }) {
  return (
    <label className={`${className}__check`}>
      <span className="visually-hidden">{value}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => {
          onChange(value, event.target.checked);
        }}
        className={`${className}__checkbox visually-hidden`}
      />
      <img className={`${className}__img ${imgMod}`} src={img} alt={value} />
    </label>
  );
};

ImgCheckbox.defaultProps = {
  imgMod: '',
};
