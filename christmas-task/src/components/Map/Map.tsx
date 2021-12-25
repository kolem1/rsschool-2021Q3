import React from 'react';

interface IMap {
  coords: string;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export const Map: React.FC<IMap> = function ({ coords, onDragOver, onDrop }) {
  return (
    <map name="image-map">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <area onDragOver={onDragOver} onDrop={onDrop} alt="" coords={coords} shape="poly" />
    </map>
  );
};
