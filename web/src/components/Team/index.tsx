import { FormEvent } from "react";
import CountryFlag from "react-country-flag";

import { Input } from "../Input";

interface ITeamProps {
  code: string;
  position: "left" | "right";
  onChangeText: (e: FormEvent<HTMLInputElement>) => void;
}

export const Team = ({ code, position, onChangeText }: ITeamProps) => {
  return (
    <div className='flex items-center'>
      {position === "left" && (
        <CountryFlag countryCode={code} style={{ marginRight: 12 }} />
      )}

      <Input className='w-10 h-9 text-center' onChange={onChangeText} />

      {position == "right" && (
        <CountryFlag countryCode={code} style={{ marginLeft: 12 }} />
      )}
    </div>
  );
};
