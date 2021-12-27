import React from 'react';
import './Garland.css';

interface IGarlandProps {
  width: number;
  height: number;
  minAngle: number;
  maxAngle: number;
  startPos: number;
  color?: string | string[];
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
    id: number;
    x: number;
    y: number;
  }[] = [];
  const middleX = Math.floor(width / 2);

  while (radius < height) {
    let angle = minAngle;
    while (angle < maxAngle) {
      angle += 20 / radius;

      items.push({
        id: items.length,
        x: (Math.abs(radius * Math.cos(angle) + middleX) / width) * 100,
        y: ((radius * Math.sin(angle)) / height) * 100,
      });
    }
    radius += step;
  }

  return (
    <div className="garland">
      {items.map((item) => {
        let mainColor = color;
        if (Array.isArray(color)) {
          const index = item.id % color.length;
          mainColor = color[index];
        }
        return (
          <div
            key={item.id}
            className="garland__item"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animationDuration: `${2 + Math.floor(Math.random() * 5)}s`,
              ['--main-color' as string]: mainColor,
            }}
          />
        );
      })}
    </div>
  );
};

Garland.defaultProps = {
  step: 100,
  color: 'red',
};
