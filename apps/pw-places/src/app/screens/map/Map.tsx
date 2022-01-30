import { MapStyledBackground } from './styles/MapStyled';
import * as pointsModules from './points';
import { v4 } from 'uuid';
import { Fragment, ReactNode } from 'react';

const points = Object.keys(pointsModules).map((key) => ({
  id: v4(),
  Component: (pointsModules as { [key: string]: () => ReactNode })[key],
}));

export function MapScreen() {
  return (
    <MapStyledBackground>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {points.map(({ id, Component }) => (
          <Fragment key={id}>{Component()}</Fragment>
        ))}
      </svg>
    </MapStyledBackground>
  );
}
