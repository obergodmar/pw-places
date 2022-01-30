import { PropsWithChildren } from 'react';
import styled, { defaultTransition, hover } from '../../../styles';
import { useDispatch } from 'react-redux';
import { setPlace } from '../../../store/reducers';

interface IPointProps {
  id: string;
  name: string;
}

const PointWrapper = styled.g`
  transform-origin: 50% 50%;
  transform-box: fill-box;

  ${defaultTransition('transform')};

  ${hover`
    transform: scale(1.2);
  `};
`;

export function Point({ id, name, children }: PropsWithChildren<IPointProps>) {
  const dispatch = useDispatch();

  return (
    <PointWrapper
      className="point"
      id={id}
      name={name}
      onClick={() => dispatch(setPlace({ name, id }))}
    >
      {children}
    </PointWrapper>
  );
}
