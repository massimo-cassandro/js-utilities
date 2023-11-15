import React from 'react';

/**
 *
 * @param {number} desktopBreakpoint - larghezza del viewport in px a partire della quale viene considerato desktop
 * @param {boolean} force - Impostare a true per forzare l'esito sempre uguale a true
 * @returns
 */

export function useIsDesktop(desktopBreakpoint, force = false) {
  const [isDesktop, updIsDesktop] = React.useState(false);

  React.useEffect(() => {

    if(force) {
      updIsDesktop(true);
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
