import React from 'react';
import './Garland.css';

interface IGarlandProps {
  width: number;
  height: number;
  minAngle: number;
  maxAngle: number;
  startPos: number;
  color?: string;
  step?: number;
}

export const Garland: React.FC<IGarlandProps> = function ({
  width,
  height,
  minAngle,
  maxAngle,
  startPos,
  color = 'red',
  step = 100,
}) {
  let radius = startPos;
  const items: {
    x: number;
    y: number;
  }[] = [];
  const middleX = Math.floor(width / 2);

  while (radius < height) {
    let angle = minAngle;
    while (angle < maxAngle) {
      angle += 20 / radius;

      items.push({
        x: (Math.abs(radius * Math.cos(angle) + middleX) / width) * 100,
        y: ((radius * Math.sin(angle)) / height) * 100,
      });
    }
    radius += step;
  }

  return (
    <div className="garland">
      {items.map((item) => (
        <div
          className="garland__item"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

Garland.defaultProps = {
  step: 100,
  color: 'red',
};
