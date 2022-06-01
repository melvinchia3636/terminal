/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */

import React, {
  ReactElement, useEffect, useRef, useState,
} from 'react';

import whoAmI from './commands/whoami';
import Banner from './commands/banner';
import Resume from './commands/resume';
import Email from './commands/email';
import Github from './commands/github';
import Command from './commands/help';
import Clear from './commands/clear';

const scrollToBottom = (id: string) => {
  const element = document.getElementById(id);
  if (element) element.scrollTop = element.scrollHeight + 100;
};

export const COMMANDS: {
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
    callback: Clear,
  },
  {
    name: 'help',
    description: 'Show list of available commands',
    callback: Command,
  },
  {
    name: 'socialmedia',
    description: 'Show list of my social media links',
    callback: () => {},
  },
  {
    name: 'github',
    description: 'Show my github profile',
    callback: Github,
  },
  {
    name: 'tree',
    description: 'Show all my projects in tree view',
    callback: () => {},
  },
  {
    name: 'email',
    description: 'Show my email address',
    callback: Email,
  },
  {
    name: 'resume',
    description: 'Show download link of my resume',
    callback: Resume,
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
    callback: Banner,
  },
  {
    name: 'history',
    description: 'View command history',
    callback: () => {},
  },
  {
    name: 'whois',
    description: 'Who is Melvin Chia?',
    callback: () => {},
  },
  {
    name: 'whoami',
    description: 'Who are you?',
    callback: whoAmI,
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
    COMMANDS.find(({ name }) => name === 'banner')?.callback(
      setContent,
      setShowInput,
    );

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
    <div
      id="terminal"
      className="w-full h-screen overflow-y-auto overflow-x-hidden bg-zinc-900 text-zinc-300 flex flex-col gap-1 p-4 text-sm font-['Jetbrains_Mono']"
    >
      {content}
      <div className="flex items-center" id="input">
        {_showInput && (
          <>
            <p className="text-green-400">visitor@thecodeblog.net:~$</p>
            <div
              className={`pl-2 pr-1 whitespace-pre ${
                COMMANDS.findIndex(({ name }) => name === _command.trim())
                !== -1
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
