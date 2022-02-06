import { Portal } from '../../../../components';
import {
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { setPlace } from '../../../../store/reducers';
import { PointStyledWrapper, PointTooltip } from './styles';
import { DialogStyledBorders } from '../../../../components/systemDialog/styles/SystemDialogStyled';

interface IPointProps {
  id: string;
  name: string;
}

export function Point({ id, name, children }: PropsWithChildren<IPointProps>) {
  const dispatch = useDispatch();
  const hoverTimer = useRef(-1);

  const [tooltipStyles, setTooltipStyles] = useState({
    top: 0,
    left: 0,
  });

  const [hover, setHover] = useState(false);

  const handleHover = useCallback((event: MouseEvent<SVGGElement>) => {
    const { clientX, clientY } = event;

    setTooltipStyles({
      top: clientY + 30,
      left: clientX,
    });

    hoverTimer.current = window.setTimeout(() => {
      setHover(true);
    }, 200);
  }, []);

  const cancelHover = useCallback(() => {
    setHover(false);
    clearTimeout(hoverTimer.current);
  }, []);

  console.log(hover, tooltipStyles);

  return (
    <>
      <PointStyledWrapper
        onMouseEnter={handleHover}
        onMouseLeave={cancelHover}
        className="point"
        id={id}
        name={name}
        onClick={() => dispatch(setPlace({ name, id }))}
      >
        {children}
      </PointStyledWrapper>

      {hover && (
        <Portal>
          <PointTooltip {...tooltipStyles}>
            <DialogStyledBorders />
            {name}
          </PointTooltip>
        </Portal>
      )}
    </>
  );
}
