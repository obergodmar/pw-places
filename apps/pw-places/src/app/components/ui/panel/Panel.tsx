import { PanelStyled } from './styles';
import { useCallback, useState } from 'react';
import { Cell } from '../cell';
import { useSelector } from 'react-redux';
import { panelItemsSelector } from '../../../store/selectors';

export enum PanelModesEnum {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

const { horizontal, vertical } = PanelModesEnum;

interface IPanelProps {
  id: string;
}

export function Panel({ id }: IPanelProps) {
  const [mode, setMode] = useState(horizontal);

  const items = useSelector(panelItemsSelector(id));

  const changeMode = useCallback(() => {
    setMode((prevState) => (prevState === horizontal ? vertical : horizontal));
  }, []);

  return (
    <PanelStyled mode={mode}>
      {[...Array(9).keys()].map((index) => (
        <Cell key={index} mode={mode} number={index + 1} item={items[index]} />
      ))}
    </PanelStyled>
  );
}
