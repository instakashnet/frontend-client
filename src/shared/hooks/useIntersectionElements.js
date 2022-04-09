import { useEffect, useRef, useState } from "react";

export const useIntersectionElements = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      const [intersection] = entries;
      setIsVisible(intersection.isIntersecting);
    }, options);

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (containerRef.current) observer.unobserve(containerRef.current);
    };

  }, [containerRef, options]);

  return { containerRef, isVisible };
};