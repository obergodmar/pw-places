import { Panel } from './panel';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setItem } from '../../store/reducers';
import { v4 } from 'uuid';
import { Portal } from '../portal';

export function Ui() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setItem({
        item: {
          uniqueId: v4(),
          itemId: 'runaPerenosa',
          parentId: '',
          position: -1,
        },
        position: {
          parentId: 'firstPanel',
          position: 8,
        },
      })
    );
  }, [dispatch]);

  return (
    <Portal>
      <Panel id="firstPanel" />
    </Portal>
  );
}
