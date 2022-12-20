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
        <CountryFlag
          svg
          countryCode={code}
          style={{ marginRight: "12px", width: "40px", height: "40px" }}
        />
      )}

      <Input
        className='w-12 h-10 px-4 font-medium text-xs rounded text-center bg-gray-600 border-gray-600 text-white placeholder-gray-30 focus:bg-gray-800 focus:border-gray-600'
        onChange={onChangeText}
      />

      {position == "right" && (
        <CountryFlag
          svg
          countryCode={code}
          style={{ marginLeft: "20px", width: "40px", height: "40px" }}
        />
      )}
    </div>
  );
};
