import { useState, useEffect } from 'react';

type WindowSize = [number, number];

const useWindowSize = (): number[] => {
  const [windowSize, setWindowSize] = useState<WindowSize>([0, 0]);

  useEffect(() => {
    function handleResize(): void {
      setWindowSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
