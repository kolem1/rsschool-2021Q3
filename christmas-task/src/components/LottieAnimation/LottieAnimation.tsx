import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import './LottieAnimation.css';

interface ILottieAnimation {
  path: string;
  name: string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation: React.FC<ILottieAnimation> = function ({ path, name, loop, autoplay }) {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector(`#lottie-${name}`) as HTMLElement,
      renderer: 'svg',
      loop,
      autoplay,
      path,
      rendererSettings: {
        progressiveLoad: true,
      },
    });
  }, [path, name, loop, autoplay]);

  return <div id={`lottie-${name}`} className="lottie-animation" />;
};

LottieAnimation.defaultProps = {
  loop: true,
  autoplay: true,
};

export default LottieAnimation;
