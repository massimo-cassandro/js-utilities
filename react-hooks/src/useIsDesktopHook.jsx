import React from 'react';

export function useIsDesktop(desktopBreakpoint) {
  const [isDesktop, updIsDesktop] = React.useState(false);

  React.useEffect(() => {

    const mql = window.matchMedia(`(min-width: ${desktopBreakpoint}px)`),
      mqlChangeHandler = () => {
        updIsDesktop(mql.matches);
      };

    mql.addEventListener('change', mqlChangeHandler);
    mqlChangeHandler();
  }, []);

  return isDesktop;
}
