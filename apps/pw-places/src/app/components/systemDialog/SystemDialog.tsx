import {
  DialogStyledBorders,
  SystemDialogStyledContainer,
  SystemDialogStyledText,
} from './styles/SystemDialogStyled';
import { PropsWithChildren } from 'react';

export function SystemDialog({ children }: PropsWithChildren<unknown>) {
  return (
    <SystemDialogStyledContainer>
      <DialogStyledBorders />
      <SystemDialogStyledText>{children}</SystemDialogStyledText>
    </SystemDialogStyledContainer>
  );
}
