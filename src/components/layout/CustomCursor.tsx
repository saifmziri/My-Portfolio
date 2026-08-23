import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    let rafId: number;
    let isHovered = false;
    let isVisible = false;

    // Direct positions without state re-renders
    const targetPos = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };

    const onMouseMove = (e: MouseEvent) => {
      targetPos.x = e.clientX;
      targetPos.y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '0.8';
        if (ringRef.current) ringRef.current.style.opacity = '0.25';
      }

      // Check hover state efficiently
      const target = e.target as HTMLElement | null;
      const hover = Boolean(
        target &&
          (target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.closest('button') ||
            target.closest('a') ||
            target.getAttribute('role') === 'button')
      );

      if (hover !== isHovered) {
        isHovered = hover;
        if (dotRef.current && ringRef.current) {
          if (isHovered) {
            dotRef.current.style.width = '16px';
            dotRef.current.style.height = '16px';
            ringRef.current.style.width = '48px';
            ringRef.current.style.height = '48px';
            ringRef.current.style.opacity = '0.6';
          } else {
            dotRef.current.style.width = '8px';
            dotRef.current.style.height = '8px';
            ringRef.current.style.width = '32px';
            ringRef.current.style.height = '32px';
            ringRef.current.style.opacity = '0.25';
          }
        }
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = '0.8';
      if (ringRef.current) ringRef.current.style.opacity = isHovered ? '0.6' : '0.25';
    };

    // Smooth physics loop via rAF
    const animate = () => {
      // Lerp dot (fast spring)
      dotPos.x += (targetPos.x - dotPos.x) * 0.4;
      dotPos.y += (targetPos.y - dotPos.y) * 0.4;

      // Lerp ring (ambient smooth lag)
      ringPos.x += (targetPos.x - ringPos.x) * 0.18;
      ringPos.y += (targetPos.y - ringPos.y) * 0.18;

      if (dotRef.current) {
        const offset = isHovered ? 8 : 4;
        dotRef.current.style.transform = `translate3d(${dotPos.x - offset}px, ${dotPos.y - offset}px, 0)`;
      }

      if (ringRef.current) {
        const offset = isHovered ? 24 : 16;
        ringRef.current.style.transform = `translate3d(${ringPos.x - offset}px, ${ringPos.y - offset}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Small Precision Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-[#C8F23D] transition-[width,height,opacity] duration-200 ease-out opacity-0 will-change-transform"
        style={{ width: '8px', height: '8px' }}
      />
      {/* Outer Subtle Ambient Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-40 rounded-full border border-[#68705A]/40 transition-[width,height,opacity] duration-200 ease-out opacity-0 will-change-transform"
        style={{ width: '32px', height: '32px' }}
      />
    </>
  );
};
