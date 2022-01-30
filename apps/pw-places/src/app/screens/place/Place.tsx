import { PlaceImage, PlaceStyledWrapper } from './styles';
import { ASSETS } from '../../constants';
import { useSelector } from 'react-redux';
import { placeSelector } from '../../store/selectors';
import { useGetPlaceQuery } from '../../store/services';

export function Place() {
  const { name, id } = useSelector(placeSelector);

  const { data, isLoading } = useGetPlaceQuery(id);

  return (
    <PlaceStyledWrapper>
      {!isLoading && (
        <PlaceImage
          src={`${ASSETS}/places/${id}/${Array.isArray(data) && data[0]}`}
          alt={name}
        />
      )}
    </PlaceStyledWrapper>
  );
}
