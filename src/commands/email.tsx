import React, { ReactElement } from 'react';

export default function Email(
  _setContent: (_callback: any) => void,
  _setShowInput: (_callback: boolean) => void,
): void {
  const win = window.open('mailto:melvinchia623600@gmail.com');
  if (win) win.close();
  _setContent((prevState: ReactElement[]) => [
    ...prevState,
    <br />,
    <p>Feel free to get in touch with me!</p>,
    <br />,
  ]);
  _setShowInput(true);
}
