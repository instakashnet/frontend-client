import { useEffect, useRef, useState } from "react";

export const useIntersectionElements = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let element = containerRef.current,
      observer = new IntersectionObserver((entries) => {
        const [intersection] = entries;
        setIsVisible(intersection.isIntersecting);
      }, options);

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };

  }, [containerRef, options]);

  return { containerRef, isVisible };
};