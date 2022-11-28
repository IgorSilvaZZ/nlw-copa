import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Footer } from "../../components/Footer";
import { Loading } from "../../components/Loading";
import { IPoolCardProps, PoolCard } from "../../components/PoolCard";

import { api } from "../../lib/axios";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";

export default function Pools() {
  const [loading, setLoading] = useState(false);
  const [pools, setPools] = useState<IPoolCardProps[]>([
    /* {
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
    }, */
  ]);

  async function fetchPools() {
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
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className='w-screen h-screen flex flex-col items-center  mx-auto bg-gray-900 overflow-y-hidden'>
      <Header title='Meus Bolões' />
      <section className='w-[750px] h-[500px] 2xl:h-[820px] flex flex-col items-center gap-4 overflow-y-auto'>
        <Button text='Buscar Bolão por Código' />
        <div className='w-full border border-solid border-[#323238]'></div>
        {pools && pools.length > 0 ? (
          <>
            {pools.map((pool) => (
              <PoolCard
                key={pool.id}
                data={pool}
                onClick={() => console.log(pool.id)}
              />
            ))}
          </>
        ) : (
          <>
            <span className='w-full text-center text-sm text-white'>
              Você ainda não está participando de {"\n"} nenhum bolão, que tal
              buscar um por código {"\n"} ou criar um novo?
            </span>
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}
