import { Participants, IParticipants } from "../Participants";
import { IPoolCardProps } from "../PoolCard";

interface IPoolHeaderProps {
  data: IPoolCardProps;
}

export const PoolHeader = ({ data }: IPoolHeaderProps) => {
  return (
    <div className='flex justify-between items-center w-full h-20 bg-transparent border-b-2 border-b-gray-600 mb-3 p-4'>
      <div className='flex flex-col gap-1'>
        <span className='text-white text-base'>{data.title}</span>

        <div className='flex gap-1'>
          <p className='text-gray-200 text-xs'>Codigo: </p>

          <p className='text-gray-200 text-xs'>{data.code}</p>
        </div>
      </div>

      <Participants
        participants={data.participants}
        count={data._count.participants}
      />
    </div>
  );
};
