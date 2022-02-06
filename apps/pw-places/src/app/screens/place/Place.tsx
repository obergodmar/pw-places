import {
  PlaceLoadingIndicator,
  PlaceLoadingIndicatorContainer,
  PlaceLoadingIndicatorSVG,
  PlaceStyledWrapper,
} from './styles';
import { ASSETS } from '../../constants';
import { useSelector } from 'react-redux';
import { placeSelector } from '../../store/selectors';
import { useGetPlaceQuery } from '../../store/services';

import { Pannellum } from '../../../external';
import { useCallback, useEffect, useRef, useState } from 'react';

export function Place() {
  const ref = useRef<SVGPathElement>(null);
  const [indicatorStyles, setIndicatorStyles] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const [isIndicatorShown, setIndicatorShown] = useState(true);

  const { name, id } = useSelector(placeSelector);

  const { data, isLoading } = useGetPlaceQuery(id);

  console.log(name);

  const handleResize = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const { width, height, left, top } = ref.current.getBoundingClientRect();

    setIndicatorStyles({ width, height, left, top });
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <PlaceStyledWrapper>
      {!isLoading && (
        <Pannellum
          width="100%"
          height="100%"
          image={`${ASSETS}/places/${id}/${Array.isArray(data) && data[0]}`}
          autoLoad
          vaov={90}
          minPitch={-45}
          maxPitch={45}
          showZoomCtrl={false}
          showControls={false}
          autoRotate={-3}
          disableKeyboardCtrl
          onLoad={() => {
            console.log('panorama loaded');
            setIndicatorShown(false);
          }}
        />
      )}

      {isIndicatorShown && (
        <>
          <PlaceLoadingIndicatorSVG>
            <path ref={ref} d="M149 955H1152V969H149V955Z" />
          </PlaceLoadingIndicatorSVG>
          <PlaceLoadingIndicatorContainer {...indicatorStyles}>
            <PlaceLoadingIndicator />
          </PlaceLoadingIndicatorContainer>
        </>
      )}
    </PlaceStyledWrapper>
  );
}
