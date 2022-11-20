import { IParticipants, Participants } from "../Participants";

export interface IPoolCardProps {
  id: string;
  code: string;
  title: string;
  ownerId: string;
  createdAt: string;
  owner: {
    name: string;
  };
  participants: IParticipants[];
  _count: {
    participants: number;
  };
}

interface IProps {
  data: IPoolCardProps;
  onClick: () => void;
}

export const PoolCard = ({ data, onClick }: IProps) => {
  return (
    <div
      className='w-full h-20 flex justify-between items-center p-4 mb-3 bg-gray-800 border-b-4 border-b-yellow-500 rounded-sm cursor-pointer transition-opacity hover:opacity-70'
      onClick={onClick}
    >
      <div className='flex flex-col gap-2 justify-center'>
        <span className='text-white text-sm'>{data.title}</span>

        <p className='text-gray-200 text-xs'>Criado por {data.owner.name}</p>
      </div>

      <Participants
        count={data._count.participants}
        participants={data.participants}
      />
    </div>
  );
};
