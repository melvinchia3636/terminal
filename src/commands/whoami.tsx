import React, { ReactElement } from 'react';
import axios from 'axios';
import publicIp from 'public-ip';

export default async function whoAmI(
  _setContent: (_callback: any) => void,
  _setShowInput: (_callback: boolean) => void,
): Promise<void> {
  const ip = await publicIp.v4();
  const { data }: any = await axios.get(
    `https://cors-anywhere.thecodeblog.net/geolocation-db.com/json/${ip}`,
  );
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
      <p className="text-yellow-400 drop-shadow-[0_0_2px_rgb(234,279,8)]">
        Consider using a VPN? Just kidding lmao.
      </p>
      <br />
    </div>,
  ]);
  _setShowInput(true);
}
