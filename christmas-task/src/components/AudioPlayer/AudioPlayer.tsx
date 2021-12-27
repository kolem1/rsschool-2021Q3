import React, { useRef, useEffect, useState, AudioHTMLAttributes } from 'react';

interface IAudioPlayer extends AudioHTMLAttributes<HTMLAudioElement> {
  isOn: boolean;
}

export const AudioPlayer: React.FC<IAudioPlayer> = function ({ isOn, ...props }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [firstClick, setFirstClick] = useState(false);

  useEffect(() => {
    if (!firstClick && isOn) {
      const handleFirstClick = () => {
        audioRef.current?.play();
        setFirstClick(true);
        document.body.removeEventListener('click', handleFirstClick);
      };
      document.body.addEventListener('click', handleFirstClick);
    } else if (isOn) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isOn, firstClick]);
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <audio ref={audioRef} {...props} />;
};
