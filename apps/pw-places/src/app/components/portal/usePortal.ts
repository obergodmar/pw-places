import { useEffect, useRef, useState } from 'react';

const ROOT_ELEMENT = 'root';

interface IUserPortalArgs {
  open: boolean;
  onClose?: () => void;
  outsideRoot?: boolean;
}

export function usePortal({
  open,
  onClose,
  outsideRoot = true,
}: IUserPortalArgs) {
  const [active, setActive] = useState(false);
  const backdrop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = backdrop;
    const transitionEnd = () => setActive(open);
    const keyHandler = (e: KeyboardEvent) => {
      if (e.code === 'Escape' && open && onClose) {
        onClose();
      }
    };

    const clickHandler = (e: MouseEvent) => {
      if (e.target === current && onClose) {
        onClose();
      }
    };

    current?.addEventListener('transitionend', transitionEnd);

    current?.addEventListener('click', clickHandler);

    window.addEventListener('keyup', keyHandler);

    let timeout: number | undefined;

    if (open) {
      timeout = window.setTimeout(() => {
        setActive(open);

        outsideRoot &&
          document.querySelector(ROOT_ELEMENT)?.setAttribute('inert', 'true');
      }, 10);
    }

    return () => {
      current?.removeEventListener('transitionend', transitionEnd);

      current?.removeEventListener('click', clickHandler);

      timeout && clearTimeout(timeout);

      outsideRoot &&
        document.querySelector(ROOT_ELEMENT)?.removeAttribute('inert');

      window.removeEventListener('keyup', keyHandler);
    };
  }, [open, onClose, outsideRoot]);

  return {
    ref: backdrop,
    active,
  };
}
