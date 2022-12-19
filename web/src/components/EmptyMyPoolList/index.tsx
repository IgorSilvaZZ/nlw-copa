import { useRouter } from "next/router";

interface IEmptyMyPoolList {
  code: string;
}

export const EmptyMyPoolList = ({ code }: IEmptyMyPoolList) => {
  const router = useRouter();

  return (
    <div className='flex flex-wrap justify-center p-4'>
      <span className='text-gray-200 text-2xl text-center'>
        Esse bolão ainda não tem participantes, que tall
      </span>

      <span
        className='underline text-yellow-500'
        onClick={() => router.push("/find")}
      >
        compartilhar o código
      </span>

      <span className='text-gray-200 text-2xl mx-1'>do bolão com alguém?</span>

      <span className='text-gray-200 mr-1'>Use o código</span>

      <span className='text-gray-200 text-2xl text-center'>{code}</span>
    </div>
  );
};
