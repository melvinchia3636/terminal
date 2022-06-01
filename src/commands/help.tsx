/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { ReactElement } from 'react';
import { COMMANDS } from '../App';

export default function Command(
  _setContent: (_callback: any) => void,
  _setShowInput: (_callback: boolean) => void,
): void {
  _setContent((prevState: ReactElement[]) => [
    ...prevState,
    <br />,
    <div>
      {COMMANDS.sort((a, b) => (a.name > b.name ? 1 : 0)).map((command) => (
        <div className="flex">
          <p className="w-32 text-yellow-400 drop-shadow-[0_0_2px_rgb(234,279,8)]">
            {command.name}
          </p>
          {command.description}
        </div>
      ))}
    </div>,
    <br />,
  ]);
  _setShowInput(true);
}
