import { useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export function useGsapContext(
  callback: (ctx: gsap.Context) => void,
  scope: RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    if (!scope.current) return;

    ctxRef.current = gsap.context(() => {
      callback(ctxRef.current!);
    }, scope);

    return () => {
      ctxRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctxRef;
}
