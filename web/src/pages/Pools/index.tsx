import { MagnifyingGlass, PlusCircle, SoccerBall } from "phosphor-react";
import { Footer } from "../../components/Footer";

export default function Pools() {
  return (
    <main className='max-w-[375px] h-[630px] flex flex-col items-center rounded-lg border border-solid border-yellow-500 mx-auto my-2 bg-gray-900 overflow-x-auto'>
      <div className='w-full flex items-center justify-center bg-gray-800 p-5 mb-2'>
        <span className='text-white'>Meus Bolões</span>
      </div>
      <section className='w-80 h-[480px] flex flex-col items-center gap-4'>
        <button className='w-full p-3 flex items-center justify-center gap-2 rounded uppercase font-semibold transition-colors bg-yellow-500 hover:bg-yellow-700'>
          <MagnifyingGlass size={18} />
          <span className='text-xs'>Buscar Bolão por Código</span>
        </button>
        <div className='w-full border border-solid border-[#323238]'></div>
        <span className='w-64 text-center text-sm text-white'>
          Você ainda não está participando de {"\n"} nenhum bolão, que tal
          buscar um por código {"\n"} ou criar um novo?
        </span>
      </section>
      <Footer />
    </main>
  );
}
