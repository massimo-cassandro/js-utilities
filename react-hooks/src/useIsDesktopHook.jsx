import { useEffect, useState } from 'react';

/**
 *
 * @param {number} desktopBreakpoint - larghezza del viewport in px a partire della quale viene considerato desktop
 * @param {boolean} force - Impostare a true o false per forzare l'esito sempre uguale a true
 * @returns {boolean}
 */

export function useIsDesktop(desktopBreakpoint, force = undefined) {
  const [isDesktop, updIsDesktop] = useState(false);

  useEffect(() => {

    if(force != null) {
      updIsDesktop(force);
    } else {
      const mql = window.matchMedia(`(min-width: ${desktopBreakpoint}px)`),
        mqlChangeHandler = () => {
          updIsDesktop(mql.matches);
        };

      mql.addEventListener('change', mqlChangeHandler);
      mqlChangeHandler();
    }

  }, []);

  return isDesktop;
}
