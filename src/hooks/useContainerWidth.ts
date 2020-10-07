import { useEffect, useState } from 'react';

const useContainerWidth = (ref: React.RefObject<HTMLDivElement>) => {
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) setContainerWidth(ref.current.offsetWidth);
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref.current]); // eslint-disable-line

  return containerWidth;
};

export default useContainerWidth;
