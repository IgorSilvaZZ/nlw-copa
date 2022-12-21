import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { MainContent } from "../../components/MainContent";
import { IPoolCardProps, PoolCard } from "../../components/PoolCard";
import { SectionContent } from "../../components/SectionContent";
import { EmptyPoolList } from "../../components/EmptyPoolList";

import { api } from "../../lib/axios";

export default function Pools() {
  const navigate = useRouter();

  const [loading, setLoading] = useState(false);
  const [pools, setPools] = useState<IPoolCardProps[]>([]);

  async function fetchPools() {
    try {
      setLoading(true);

      const { data } = await api.get("/pools");

      setPools(data.pools);
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
    return (
      <MainContent>
        <div className='flex w-full h-full items-center justify-center'>
          <Loading />
        </div>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <Header title='Meus Bolões' />
      <SectionContent>
        <Button
          text='Buscar Bolão por Código'
          onClick={() => goToPage("/find")}
        />
        <div className='w-full border border-solid border-[#323238]'></div>
        {pools && pools.length > 0 ? (
          <>
            {pools.map((pool) => (
              <PoolCard
                key={pool.id}
                data={pool}
                onClick={() => navigate.push(`/details/${pool.id}`)}
              />
            ))}
          </>
        ) : (
          <EmptyPoolList />
        )}
      </SectionContent>
      <Footer />
    </MainContent>
  );
}
