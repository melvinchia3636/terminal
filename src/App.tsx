/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, {
  ReactElement, useEffect, useRef, useState,
} from 'react';
import Typed from 'react-typed';
import publicIp from 'public-ip';

const scrollToBottom = (id: string) => {
  const element = document.getElementById(id);
  if (element) element.scrollTop = element.scrollHeight + 100;
};

function Text({
  text,
  setShowInput,
}: {
  text: string[];
  setShowInput: (_state: boolean) => void;
}): ReactElement {
  return (
    <Typed
      strings={text}
      typeSpeed={0}
      showCursor={false}
      onComplete={() => setShowInput(true)}
    />
  );
}

const COMMANDS: {
  name: string;
  description: string;
  callback: (
    _setContent: (_callback: any) => void,
    _setShowInput: (_callback: boolean) => void
  ) => void;
}[] = [
  {
    name: 'clear',
    description: 'Clear the terminal',
    callback: (_setContent, _setShowInput) => {
      _setContent([]);
      _setShowInput(true);
    },
  },
  {
    name: 'help',
    description: 'Show list of available commands',
    callback: (_setContent, _setShowInput) => {
      _setContent((prevState: ReactElement[]) => [
        ...prevState,
        <br />,
        <Text
          setShowInput={_setShowInput}
          text={[
            COMMANDS.sort().map(
              (command) => (
                `<div class="flex">
                  <p class="w-32 text-yellow-400 drop-shadow-[0_0_2px_rgb(234,279,8)]">${command.name}</p>
                  ${command.description}
                </div>`
              ),
            ).join(''),
          ]}
        />,
        <br />,
      ]);
    },
  },
  {
    name: 'socialmedia',
    description: 'Show list of my social media links',
    callback: () => {},
  },
  {
    name: 'github',
    description: 'Show my github profile',
    callback: () => {},
  },
  {
    name: 'tree',
    description: 'Show all my projects in tree view',
    callback: () => {},
  },
  {
    name: 'email',
    description: 'Show my email address',
    callback: () => {},
  },
  {
    name: 'resume',
    description: 'Show download link of my resume',
    callback: () => {},
  },
  {
    name: 'normal',
    description: 'Go back to normal website view',
    callback: () => {},
  },
  {
    name: 'cat',
    description: 'Show list of all project categories',
    callback: () => {},
  },
  {
    name: 'ls',
    description: 'Show list of projects in current directory',
    callback: () => {},
  },
  {
    name: 'cd',
    description: 'Change directory',
    callback: () => {},
  },
  {
    name: 'banner',
    description: 'Display the header',
    callback: (_setContent, _setShowInput) => {
      _setContent((prevState: ReactElement[]) => [
        ...prevState,
        <Text
          setShowInput={_setShowInput}
          text={[
            `
          Session Contents Restored on 27 May 2022 at 4:37 PM<br/>
          Last login: Thu May 26 22:04:35 on ttys000<br/>
          <br/>
          Copyright (c) thecodeblog.net. All rights reserved.<br/><br/>
          <span class="font-[Monospace] drop-shadow-[0_0_2px_rgb(234,279,8)] text-yellow-400">
          ╭━━━━┳╮╱╭┳━━━┳━━━┳━━━┳━━━┳━━━┳━━╮╭╮╱╱╭━━━┳━━━╮╱╱╭━╮╱╭┳━━━┳━━━━╮<br class="h-0 block -mt-1" />
          ┃╭╮╭╮┃┃╱┃┃╭━━┫╭━╮┃╭━╮┣╮╭╮┃╭━━┫╭╮┃┃┃╱╱┃╭━╮┃╭━╮┃╱╱┃┃╰╮┃┃╭━━┫╭╮╭╮┃<br class="h-0 block -mt-1" />
          ╰╯┃┃╰┫╰━╯┃╰━━┫┃╱╰┫┃╱┃┃┃┃┃┃╰━━┫╰╯╰┫┃╱╱┃┃╱┃┃┃╱╰╯╱╱┃╭╮╰╯┃╰━━╋╯┃┃╰╯<br class="h-0 block -mt-1" />
          ╱╱┃┃╱┃╭━╮┃╭━━┫┃╱╭┫┃╱┃┃┃┃┃┃╭━━┫╭━╮┃┃╱╭┫┃╱┃┃┃╭━╮╱╱┃┃╰╮┃┃╭━━╯╱┃┃<br class="h-0 block -mt-1" />
          ╱╱┃┃╱┃┃╱┃┃╰━━┫╰━╯┃╰━╯┣╯╰╯┃╰━━┫╰━╯┃╰━╯┃╰━╯┃╰┻━┃╭╮┃┃╱┃┃┃╰━━╮╱┃┃<br class="h-0 block -mt-1" />
          ╱╱╰╯╱╰╯╱╰┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━╯╰╯╰╯╱╰━┻━━━╯╱╰╯<br />
          </span><br/>
          <p>Welcome to the ultimate interactive project explorer.</p>
          <p>
          For a list of available commands, type 
          <span class="drop-shadow-[0_0_2px_rgb(234,279,8)] text-yellow-500">
            'help'
          </span>.
        </p>
        `,
          ]}
        />,
      ]);
    },
  },
  {
    name: 'history',
    description: 'View command history',
    callback: () => {},
  },
  {
    name: 'whois',
    description: 'Who is Melvin Chia?',
    callback: () => {
    },
  },
  {
    name: 'whoami',
    description: 'Who are you?',
    callback: async (_setContent, _setShowInput) => {
      const ip = await publicIp.v4();
      const { data }: any = await axios.get(`https://cors-anywhere.thecodeblog.net/geolocation-db.com/json/${ip}`);
      _setContent((prevState: ReactElement[]) => [
        ...prevState,
        <div>
          <br />
          IPv4 address:
          {' '}
          {data.IPv4}
          <br />
          country:
          {' '}
          {data.country_name}
          <br />
          city:
          {' '}
          {data.city}
          <br />
          postal code:
          {' '}
          {data.postal}
          <br />
          latitude:
          {' '}
          {data.latitude}
          <br />
          longitude:
          {' '}
          {data.longitude}
          <br />
          <br />
          <p className="text-yellow-400 drop-shadow-[0_0_2px_rgb(234,279,8)]">Consider using a VPN? Just kidding lmao.</p>
          <br />
        </div>,
      ]);
      _setShowInput(true);
    },
  },
];

function App() {
  const [content, setContent] = useState<ReactElement[]>([]);
  const [_showInput, _setShowInput] = useState<boolean>(false);
  const [_command, _setCommand] = useState<string>('');
  const command = useRef<string>(_command);
  const showInput = useRef<boolean>(_showInput);

  const setCommand = (c: string) => {
    command.current = c;
    _setCommand(c);
  };

  const setShowInput = (s: boolean) => {
    showInput.current = s;
    _setShowInput(s);
  };

  useEffect(() => {
    COMMANDS.find(({ name }) => name === 'banner')?.callback(setContent, setShowInput);

    document.body.onkeydown = async (e: KeyboardEvent) => {
      e.preventDefault();
      if (!showInput.current) {
        return;
      }

      if (e.key === 'Backspace') {
        setCommand(command.current.slice(0, -1));
        return;
      }

      if (e.key.length === 1) {
        setTimeout(() => {
          setCommand(command.current + e.key);
        }, 50);
      }

      if (e.key === 'Enter') {
        const cmd = command.current.trim();

        const target = COMMANDS.find((c) => c.name === cmd);

        if (target) {
          setContent((prevState) => [
            ...prevState,
            <p className="text-green-400">
              visitor@thecodeblog.net:~$
              <span className="pl-2 pr-1 whitespace-pre text-yellow-400">
                {cmd}
              </span>
            </p>,
          ]);
          setShowInput(false);
          await target.callback(setContent, setShowInput);
          setCommand('');
          setTimeout(() => {
            scrollToBottom('terminal');
          }, 50);

          return;
        }

        setContent((prevState) => [
          ...prevState,
          <p className="text-green-400">
            visitor@thecodeblog.net:~$
            <span className="pl-2 pr-1 whitespace-pre text-rose-400">
              {cmd}
            </span>
          </p>,
        ]);

        if (cmd) {
          setContent((prevState) => [
            ...prevState,
            <p>
              Command not found. For a list of commands, type
              {' '}
              <span className="drop-shadow-[0_0_2px_rgb(234,279,8)] text-yellow-500">
                &apos;help&apos;
              </span>
              .
            </p>,
          ]);
        }

        setCommand('');

        setTimeout(() => {
          scrollToBottom('terminal');
        }, 50);
      }
    };

    return () => {
      setContent([]);
    };
  }, []);

  return (
    <div id="terminal" className="w-full h-screen overflow-y-auto overflow-x-hidden bg-zinc-900 text-zinc-300 flex flex-col gap-1 p-4 text-sm font-['Jetbrains_Mono']">
      {content}
      <div className="flex items-center" id="input">
        {_showInput && (
          <>
            <p className="text-green-400">visitor@thecodeblog.net:~$</p>
            <div
              className={`pl-2 pr-1 whitespace-pre ${
                COMMANDS.findIndex(({ name }) => name === _command.trim()) !== -1
                  ? 'text-yellow-400'
                  : 'text-rose-400'
              }`}
            >
              {_command}
            </div>
          </>
        )}
        <span className="w-2 h-5 bg-zinc-300 animate-pulse [animation-duration:1s]" />
      </div>
    </div>
  );
}

export default App;
