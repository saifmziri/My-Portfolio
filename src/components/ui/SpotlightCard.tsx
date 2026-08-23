import React, { useRef } from 'react';
import { cn } from '../../utils/cn';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = React.memo(({
  children,
  className = '',
  spotlightColor = 'rgba(104, 112, 90, 0.08)',
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleFocus = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = '1';
  };

  const handleBlur = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = '0';
  };

  const handleMouseEnter = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative rounded-xl border border-[#3F4739] bg-[#1B1E1A] hover:bg-[#222720] p-6 backdrop-blur-md overflow-hidden transition-all duration-300',
        className
      )}
      {...props}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
});

SpotlightCard.displayName = 'SpotlightCard';
