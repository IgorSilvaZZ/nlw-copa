import * as Avatar from "@radix-ui/react-avatar";

export interface IParticipants {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
}

export interface IParticipantsProps {
  participants: IParticipants[];
  count: number;
}

export const Participants = ({ participants, count }: IParticipantsProps) => {
  return (
    <div className='flex items-center gap-1'>
      {participants &&
        participants.map((participant) => (
          <div className='flex'>
            <Avatar.Root className='w-8 h-8 flex justify-center items-center overflow-hidden rounded-full border-gray-800 ml-[-3px]'>
              <Avatar.Image
                className='w-full h-full object-cover'
                src={participant.user.avatarUrl}
              />
              <Avatar.AvatarFallback className='w-full h-full flex justify-center items-center overflow-hidden bg-gray-700'>
                {participant.user?.name?.at(0)?.toUpperCase()}
              </Avatar.AvatarFallback>
            </Avatar.Root>
          </div>
        ))}

      <Avatar.Root className='w-8 h-8 flex justify-center items-center overflow-hidden rounded-full bg-gray-700 border-gray-800 ml-[-3px]'>
        <p className='text-xs text-gray-100 font-medium'>
          {count ? `+${count}` : 0}
        </p>
      </Avatar.Root>
    </div>
  );
};
