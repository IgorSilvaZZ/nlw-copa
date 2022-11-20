import { useEffect, useState } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { toast } from "react-toastify";

import { Footer } from "../../components/Footer";
import { Loading } from "../../components/Loading";
import { IPoolCardProps, PoolCard } from "../../components/PoolCard";

import { api } from "../../lib/axios";

export default function Pools() {
  const [loading, setLoading] = useState(false);
  const [pools, setPools] = useState<IPoolCardProps[]>([
    {
      id: "22606651-48ae-411d-b4f7-f18790d7e9a9",
      title: "Exemple Pool",
      code: "BOL123",
      ownerId: "f671ab97-2a32-4f9b-bb06-bad145525735",
      createdAt: String(new Date()),
      _count: {
        participants: 1,
      },
      owner: {
        name: "Igor Silva",
      },
      participants: [
        {
          id: "4b0202c3-324b-48e3-9cdd-d2cc5835bb2a",
          user: {
            avatarUrl: "https://avatars.githubusercontent.com/u/65422544?v=4",
            name: "Igor Silva",
          },
        },
        {
          id: "871a8afa-5ca8-4427-a0df-92ff1c0aaa78",
          user: {
            avatarUrl: "https://avatars.githubusercontent.com/u/2254731?v=4",
            name: "Diego Fernandez",
          },
        },
      ],
    },
  ]);

  /* async function fetchPools() {
    try {
      setLoading(true);

      const { data } = await api.get("/pools");

      setPools(data);
    } catch (error) {
      console.error(error);
      toast.error("Não foi possivel carregar os Bolões!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPools();
  }, []); */

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
        {/* <span className='w-64 text-center text-sm text-white'>
          Você ainda não está participando de {"\n"} nenhum bolão, que tal
          buscar um por código {"\n"} ou criar um novo?
        </span> */}
        {loading ? (
          <Loading />
        ) : (
          <>
            {pools.map((pool) => (
              <PoolCard
                key={pool.id}
                data={pool}
                onClick={() => console.log(pool.id)}
              />
            ))}
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}
