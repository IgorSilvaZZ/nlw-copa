import { FormEvent } from "react";
import { getName } from "country-list";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { X, Check } from "phosphor-react";

import { Team } from "../Team";

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
  secundTeamCountryCode: string;
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
    .format("DD [de] MMMM [de] YYYY [ás] HH:00[h]");

  return (
    <div className='flex flex-col items-center w-full bg-gray-800 rounded-sm border-b-2 border-b-yellow-500 mb-4 p-4'>
      <span className='text-gray-100 text-lg'>
        <span>{getName(data.firstTeamCountryCode)}</span> vs.{" "}
        <span>{getName(data.secundTeamCountryCode)}</span>
      </span>

      <span className='text-gray-200 text-base'>{when}</span>

      <div className='flex w-full justify-around items-center mt-4'>
        <Team
          code={data.firstTeamCountryCode}
          position='right'
          onChangeText={setFirstTeamPoints}
          defaultValue={data.guess ? String(data.guess.firstTeamPoints) : ""}
        />

        <X className='text-gray-300' size={24} />

        <Team
          code={data.secundTeamCountryCode}
          position='left'
          onChangeText={setSecondTeamPoints}
          defaultValue={data.guess ? String(data.guess.secondTeamPoints) : ""}
        />
      </div>

      {!data.guess && dayjs(new Date()).isBefore(data.date) && (
        <button
          className='w-[600px] p-3 flex items-center justify-center gap-2 rounded uppercase font-semibold bg-green-500 mt-4'
          onClick={onGuessConfirm}
        >
          <span className='text-white text-sm mr-3'>CONFIRMAR PALPITE</span>

          <Check className='text-white' size={24} />
        </button>
      )}
    </div>
  );
};
