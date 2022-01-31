import { PlaceStyledWrapper } from './styles';
import { ASSETS } from '../../constants';
import { useSelector } from 'react-redux';
import { placeSelector } from '../../store/selectors';
import { useGetPlaceQuery } from '../../store/services';

import { Pannellum } from 'pannellum-react';

export function Place() {
  const { name, id } = useSelector(placeSelector);

  const { data, isLoading } = useGetPlaceQuery(id);

  console.log(name);

  return (
    <PlaceStyledWrapper>
      {!isLoading && (
        <Pannellum
          width="100%"
          height="100%"
          image={`${ASSETS}/places/${id}/${Array.isArray(data) && data[0]}`}
          autoLoad
          vaov={90}
          showZoomCtrl={false}
          showControls={false}
          onLoad={() => {
            console.log('panorama loaded');
          }}
        />
      )}
    </PlaceStyledWrapper>
  );
}
