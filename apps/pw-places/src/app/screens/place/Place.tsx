import { PlaceStyledWrapper } from './styles';
import { ASSETS } from '../../constants';
import { useSelector } from 'react-redux';
import { placeSelector } from '../../store/selectors';
import { useGetPlaceQuery } from '../../store/services';

import { Pannellum } from '../../../external';
import { useCallback, useEffect, useRef } from 'react';

export function Place() {
  const ref = useRef<HTMLDivElement>(null);

  const { name, id } = useSelector(placeSelector);

  const { data, isLoading } = useGetPlaceQuery(id);

  console.log(name);

  const handleResize = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const { width, height } = ref.current.getBoundingClientRect();

    console.log(width, height);
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <PlaceStyledWrapper ref={ref}>
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
          }}
        />
      )}
    </PlaceStyledWrapper>
  );
}
