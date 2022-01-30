import {
  SystemDialogStyledBorders,
  SystemDialogStyledContainer,
  SystemDialogStyledText,
} from './styles/SystemDialogStyled';
import { PropsWithChildren } from 'react';

export function SystemDialog({ children }: PropsWithChildren<unknown>) {
  return (
    <SystemDialogStyledContainer>
      <SystemDialogStyledBorders />
      <SystemDialogStyledText>{children}</SystemDialogStyledText>
    </SystemDialogStyledContainer>
  );
}
