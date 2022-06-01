import React, { ReactElement } from 'react';

export default function Resume(
  _setContent: (_callback: any) => void,
  _setShowInput: (_callback: boolean) => void,
): void {
  _setContent((prevState: ReactElement[]) => [
    ...prevState,
    <br />,
    <p>Coming Soon!</p>,
    <br />,
  ]);
  _setShowInput(true);
}
