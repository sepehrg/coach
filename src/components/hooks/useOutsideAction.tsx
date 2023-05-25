import React, { useCallback, useEffect } from 'react';

export function useOutsideDetector(ref: React.RefObject<HTMLElement>, onClickOutside: () => void) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    },
    [ref, onClickOutside],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handleClickOutside]);
}
