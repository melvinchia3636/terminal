import { Icon } from '@iconify/react';
import axios from 'axios';
import React, { ReactElement } from 'react';

export default async function Github(
  _setContent: (_callback: any) => void,
  _setShowInput: (_callback: boolean) => void,
): Promise<void> {
  const response = await axios.get(
    'https://api.github.com/users/melvinchia3636',
    {
      headers: {
        Authorization: `token ${window.atob(import.meta.env.VITE_GITHUB_TOKEN)}`,
      },
    },
  );
  const { data } = response;

  _setContent((prevState: ReactElement[]) => [
    ...prevState,
    <div className="w-1/2 my-4 border-2 flex border-yellow-400 bg-zinc-900 drop-shadow-[0_0_2px_rgb(234,279,8)] p-4">
      <div>
        <img
          src={data.avatar_url}
          alt="avatar"
          className="h-full aspect-square"
        />
      </div>
      <div className="ml-6 flex flex-col justify-center">
        <p className="text-yellow-400 text-xl">{data.name}</p>
        <p className="mt-2">{data.bio}</p>
        <div className="flex mt-3 gap-12">
          <div className="flex items-center">
            <Icon
              icon="octicon:repo-16"
              className="text-yellow-400 w-5 h-5"
            />
            <p className="text-yellow-400 text-sm ml-2">
              {data.public_repos}
              {' '}
              repos
            </p>
          </div>
          <div className="flex items-center">
            <Icon
              icon="octicon:people-16"
              className="text-yellow-400 w-5 h-5"
            />
            <p className="text-yellow-400 text-sm ml-2">
              {data.followers}
              {' '}
              followers
            </p>
          </div>
        </div>
        <a href={data.html_url} className="text-zinc-900 font-medium p-3 border-2 border-yellow-400 bg-yellow-400 block mt-8 text-center">
          VISIT PROFILE
        </a>
        <a href={data.html_url} className="text-yellow-400 p-3 border-2 border-yellow-400 block mt-2 text-center">
          COPY PROFILE LINK
        </a>
      </div>
    </div>,
  ]);
  _setShowInput(true);
}
