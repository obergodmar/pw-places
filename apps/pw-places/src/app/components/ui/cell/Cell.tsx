import { CellItem, CellNumber, CellStyled } from './styles';
import { PanelModesEnum } from '../panel';
import { IPanelItem } from '../../../store/reducers';
import { items as itemsIcons } from '../../../../assets/elements';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { applyItemAction } from '../../../store';

interface ICellProps {
  mode: PanelModesEnum;
  number: number;
  item: IPanelItem | undefined;
}

export function Cell({ mode, number, item }: ICellProps) {
  const dispatch = useDispatch();

  const itemContent = useMemo(() => {
    if (item) {
      const { itemId } = item;

      return (
        <CellItem
          src={itemsIcons[itemId]}
          alt=""
          onClick={() => dispatch(applyItemAction(itemId))}
        />
      );
    }

    return null;
  }, [item, dispatch]);

  return (
    <CellStyled mode={mode}>
      {itemContent}
      <CellNumber>{number}</CellNumber>
    </CellStyled>
  );
}
