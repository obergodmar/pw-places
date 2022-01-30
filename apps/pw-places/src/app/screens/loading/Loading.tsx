import { LoadingStyledWrapper } from './styles';
import { SystemDialog } from '../../components';

export function LoadingScreen() {
  return (
    <LoadingStyledWrapper>
      <SystemDialog>Входим в игру... Подождите, пожалуйста.</SystemDialog>
    </LoadingStyledWrapper>
  );
}
