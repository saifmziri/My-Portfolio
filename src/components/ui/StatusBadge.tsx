import React from 'react';
import { cn } from '../../utils/cn';

interface StatusBadgeProps {
  status?: 'available' | 'busy' | 'tech';
  text: string;
  className?: string;
  dotClassName?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status = 'available',
  text,
  className = '',
  dotClassName = ''
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono tracking-wide backdrop-blur-md transition-colors',
        status === 'available' && 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300',
        status === 'busy' && 'border-amber-500/30 bg-amber-950/20 text-amber-300',
        status === 'tech' && 'border-white/10 bg-white/5 text-zinc-300',
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        {status === 'available' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={cn(
            'relative inline-flex rounded-full h-2 w-2',
            status === 'available' && 'bg-emerald-400',
            status === 'busy' && 'bg-amber-400',
            status === 'tech' && 'bg-indigo-400',
            dotClassName
          )}
        />
      </span>
      <span>{text}</span>
    </div>
  );
};
