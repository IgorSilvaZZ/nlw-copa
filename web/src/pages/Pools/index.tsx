import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { MainContent } from "../../components/MainContent";
import { IPoolCardProps, PoolCard } from "../../components/PoolCard";

import { api } from "../../lib/axios";

export default function Pools() {
  const navigate = useRouter();

  const [loading, setLoading] = useState(false);
  const [pools, setPools] = useState<IPoolCardProps[]>([]);

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

  function goToPage(page: string) {
    navigate.push(page);
  }

  useEffect(() => {
    fetchPools();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <MainContent>
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
            <span className='w-full text-center text-xl text-white'>
              Você ainda não está participando de <br /> nenhum bolão, que tal{" "}
              <span
                className='text-yellow-500 cursor-pointer transitions-colors'
                onClick={() => goToPage("/find")}
              >
                buscar um por código
              </span>
              <br />
              ou{" "}
              <span className='text-yellow-500 cursor-pointer transitions-colors'>
                criar um novo?
              </span>
            </span>
          </>
        )}
      </section>
      <Footer />
    </MainContent>
  );
}
