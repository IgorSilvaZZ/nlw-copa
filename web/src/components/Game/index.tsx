import { FormEvent } from "react";
import { getName } from "country-list";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { X, Check } from "phosphor-react";

import { Team } from "../Team";
import { Button } from "../Button";

export interface IGuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface IGameProps {
  id: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: null | IGuessProps;
  date: string;
}

interface IGameComponentProps {
  data: IGameProps;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (e: FormEvent<HTMLInputElement>) => void;
  setSecondTeamPoints: (e: FormEvent<HTMLInputElement>) => void;
}

export const Game = ({
  data,
  setFirstTeamPoints,
  setSecondTeamPoints,
  onGuessConfirm,
}: IGameComponentProps) => {
  const when = dayjs(data.date)
    .locale(ptBR)
    .format("DD [de] YYYY [ás] HH:00[h]");

  return (
    <div className='flex flex-col items-center w-full bg-gray-800 rounded-sm border-b-2 border-b-yellow-500 mb-4 p-4'>
      <span className='text-gray-100 text-2xl'>
        {getName(data.firstTeamCountryCode)}
        vs. <br />
        {getName(data.secondTeamCountryCode)}
      </span>

      <span className='text-gray-200 text-2xl'>{when}</span>

      <div className='flex w-full justify-center items-center mt-4'>
        <Team
          code={data.firstTeamCountryCode}
          position='right'
          onChangeText={setFirstTeamPoints}
        />

        <X className='text-gray-300' size={8} />

        <Team
          code={data.secondTeamCountryCode}
          position='left'
          onChangeText={setSecondTeamPoints}
        />
      </div>

      {!data.guess && (
        <button
          className='w-full p-3 flex items-center justify-center gap-2 rounded uppercase font-semibold bg-green-500 mt-4'
          onClick={onGuessConfirm}
        >
          <span className='text-white text-2xl mr-3'>CONFIRMAR PALPITE</span>

          <Check className='text-white' size={4} />
        </button>
      )}
    </div>
  );
};
