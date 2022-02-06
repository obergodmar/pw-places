import { PropsWithChildren, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

export function Portal({ children }: PropsWithChildren<unknown>) {
  const el = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    const target = document.body;

    target.appendChild(el);
    return () => {
      target.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(children, el);
}
