import { useRouter } from "next/router";

interface IEmptyMyPoolList {
  code: string;
}

export const EmptyMyPoolList = ({ code }: IEmptyMyPoolList) => {
  const router = useRouter();

  return (
    <div className='flex flex-wrap justify-center p-4 text-2xl text-gray-200'>
      <span className='text-center'>
        Esse bolão ainda não tem participantes, que tal
      </span>

      <span
        className='underline text-yellow-500 cursor-pointer'
        onClick={() => router.push("/find")}
      >
        compartilhar o código
      </span>

      <span className='mx-1'>do bolão com alguém?</span>

      <span className='mr-1'>Use o código</span>

      <span className='font-medium text-center'>{code}</span>
    </div>
  );
};
