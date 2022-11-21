import { PlusCircle, SoccerBall } from "phosphor-react";

export const Footer = () => {
  return (
    <div className='w-full fixed bottom-0 flex items-center justify-center gap-5 bg-gray-800 p-5 mt-2 text-gray-500'>
      <button className='flex items-center gap-2'>
        <PlusCircle />
        <span>Novo Bolão</span>
      </button>
      <button className=' flex items-center gap-2'>
        <SoccerBall />
        <span>Meus Bolões</span>
      </button>
    </div>
  );
};
