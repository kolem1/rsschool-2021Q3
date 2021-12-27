import React, { useRef, useEffect } from 'react';
import './Snow.css';

export const Snow: React.FC = function () {
  const snowRef = useRef<HTMLDivElement>(null);

  function createSnowFlake(wrapper: HTMLDivElement) {
    const snowFlake = document.createElement('span');
    snowFlake.classList.add('snowflake');
    snowFlake.style.left = `${Math.random() * wrapper.offsetWidth}px`;
    snowFlake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowFlake.style.opacity = String(Math.random());
    const size = `${Math.random() * 10 + 10}px`;
    snowFlake.style.width = size;
    snowFlake.style.height = size;
    snowFlake.style.backgroundImage = `url(${process.env.PUBLIC_URL}/assets/svg/snow.svg)`;

    wrapper.append(snowFlake);

    setTimeout(() => {
      snowFlake.remove();
    }, 5000);
  }

  useEffect(() => {
    if (snowRef.current) {
      setInterval(createSnowFlake, 50, snowRef.current);
    }
  }, []);

  return <div ref={snowRef} className="snow" />;
};
