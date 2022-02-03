import { PropsWithChildren } from 'react';
import { useDispatch } from 'react-redux';
import { setPlace } from '../../../../store/reducers';
import { PointStyledWrapper } from './styles';

interface IPointProps {
  id: string;
  name: string;
}

export function Point({ id, name, children }: PropsWithChildren<IPointProps>) {
  const dispatch = useDispatch();

  return (
    <PointStyledWrapper
      className="point"
      id={id}
      name={name}
      onClick={() => dispatch(setPlace({ name, id }))}
    >
      {children}
    </PointStyledWrapper>
  );
}
