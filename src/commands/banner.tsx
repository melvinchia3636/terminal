import React, { ReactElement } from 'react';

export default function Banner(
  _setContent: (_callback: any) => void,
  _setShowInput: (_callback: boolean) => void,
): void {
  _setContent((prevState: ReactElement[]) => [
    ...prevState,
    <br />,
    <p>
      Session Contents Restored on 27 May 2022 at 4:37 PM
      <br />
      Last login: Thu May 26 22:04:35 on ttys000
      <br />
      <br />
      Copyright (c) thecodeblog.net. All rights reserved.
      <br />
      <br />
      <span className="font-[Monospace] drop-shadow-[0_0_2px_rgb(234,279,8)] text-yellow-400">
        ╭━━━━┳╮╱╭┳━━━┳━━━┳━━━┳━━━┳━━━┳━━╮╭╮╱╱╭━━━┳━━━╮╱╱╭━╮╱╭┳━━━┳━━━━╮
        <br className="h-0 block -mt-1" />
        ┃╭╮╭╮┃┃╱┃┃╭━━┫╭━╮┃╭━╮┣╮╭╮┃╭━━┫╭╮┃┃┃╱╱┃╭━╮┃╭━╮┃╱╱┃┃╰╮┃┃╭━━┫╭╮╭╮┃
        <br className="h-0 block -mt-1" />
        ╰╯┃┃╰┫╰━╯┃╰━━┫┃╱╰┫┃╱┃┃┃┃┃┃╰━━┫╰╯╰┫┃╱╱┃┃╱┃┃┃╱╰╯╱╱┃╭╮╰╯┃╰━━╋╯┃┃╰╯
        <br className="h-0 block -mt-1" />
        ╱╱┃┃╱┃╭━╮┃╭━━┫┃╱╭┫┃╱┃┃┃┃┃┃╭━━┫╭━╮┃┃╱╭┫┃╱┃┃┃╭━╮╱╱┃┃╰╮┃┃╭━━╯╱┃┃
        <br className="h-0 block -mt-1" />
        ╱╱┃┃╱┃┃╱┃┃╰━━┫╰━╯┃╰━╯┣╯╰╯┃╰━━┫╰━╯┃╰━╯┃╰━╯┃╰┻━┃╭╮┃┃╱┃┃┃╰━━╮╱┃┃
        <br className="h-0 block -mt-1" />
        ╱╱╰╯╱╰╯╱╰┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━╯╰╯╰╯╱╰━┻━━━╯╱╰╯
        <br />
      </span>
      <br />
      <p>Welcome to the ultimate interactive project explorer.</p>
      <p>
        For a list of available commands, type
        {' '}
        <span className="drop-shadow-[0_0_2px_rgb(234,279,8)] text-yellow-500">
          &apos;help&apos;
        </span>
        .
      </p>
    </p>,
    <br />,
  ]);
  _setShowInput(true);
}
