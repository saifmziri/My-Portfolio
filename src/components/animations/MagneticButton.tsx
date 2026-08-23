import React, { useRef } from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = React.memo(({
  children,
  className = '',
  magneticStrength = 0.3,
  as = 'button',
  href,
  target,
  rel,
  onClick,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = (e.clientX - centerX) * magneticStrength;
    const distanceY = (e.clientY - centerY) * magneticStrength;

    ref.current.style.transform = `translate3d(${distanceX}px, ${distanceY}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate3d(0px, 0px, 0)';
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block transition-transform duration-200 ease-out will-change-transform"
    >
      {as === 'a' ? (
        <a
          href={href}
          target={target}
          rel={rel}
          className={className}
          onClick={onClick as any}
        >
          {children}
        </a>
      ) : (
        <button
          className={className}
          onClick={onClick}
          {...(props as any)}
        >
          {children}
        </button>
      )}
    </div>
  );
});

MagneticButton.displayName = 'MagneticButton';
