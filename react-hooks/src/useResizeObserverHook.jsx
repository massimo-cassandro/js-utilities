// forked from https://github.com/antonioru/beautiful-react-hooks/blob/master/src/useResizeObserver.ts

/**
 * Uses the ResizeObserver API to observe changes within the given HTML Element DOM Rect.
 * @param elementRef
 * @returns {undefined}
 */

import React from 'react';

function UseResizeObserver(elementRef) {

  const [DOMRect, setDOMRect] = React.useState(null),
    observerRef = React.useRef();

  // init
  React.useEffect(() => {
    observerRef.current = new ResizeObserver( entries => {
      const { bottom, height, left, right, top, width } = entries[0].contentRect;
      setDOMRect({ bottom, height, left, right, top, width });
    });
  }, []);

  // observe
  React.useEffect(() => {
    observerRef.current.observe(elementRef.current);
  }, [elementRef]);

  return DOMRect;
}

export default UseResizeObserver;
