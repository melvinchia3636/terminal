import { ReactElement, useEffect, useRef, useState } from "react";
import Typed from "react-typed";

const Text = ({
  text,
  setShowInput,
}: {
  text: string[];
  setShowInput: (state: boolean) => void;
}): ReactElement => {
  return (
    <Typed
      strings={text}
      typeSpeed={0}
      showCursor={false}
      onComplete={() => setShowInput(true)}
    />
  );
};

function App() {
  const [content, setContent] = useState<ReactElement[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [_command, _setCommand] = useState<string>("");
  const command = useRef<string>(_command);

  const setCommand = (c: string) => {
    command.current = c;
    _setCommand(c);
  };

  useEffect(() => {
    setContent((prevState) => [
      ...prevState,
      <Text
        setShowInput={setShowInput}
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

    document.body.onkeydown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.key === "Backspace") {
        setCommand(command.current.slice(0, -1));
        return;
      }

      if (e.key.length === 1) {
        setTimeout(() => {
          setCommand(command.current + e.key);
        }, 50);
      }

      if (e.key === "Enter") {
        const _command = command.current;
        setContent((prevState) => [
          ...prevState,
          <p className="text-green-400">
            visitor@thecodeblog.net:~$
            <span className="pl-2 pr-1 whitespace-pre text-rose-400">
              {_command}
            </span>
          </p>,
          <p>
            Command not found. For a list of commands, type{" "}
            <span className="drop-shadow-[0_0_2px_rgb(234,279,8)] text-yellow-500">
              'help'
            </span>
            .
          </p>,
        ]);
        setCommand("");
      }
    };

    return () => {
      setContent([]);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-zinc-900 text-zinc-300 flex flex-col gap-1 p-4 text-sm font-['Jetbrains_Mono']">
      {content}
      {showInput && (
        <div className="flex items-center">
          <p className="text-green-400">visitor@thecodeblog.net:~$</p>
          <div className="pl-2 pr-1 whitespace-pre">{_command}</div>
          <span className="w-2 h-5 bg-zinc-300 animate-pulse [animation-duration:1s]"></span>
        </div>
      )}
    </div>
  );
}

export default App;
