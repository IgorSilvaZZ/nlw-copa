import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { EmptyMyPoolList } from "../../components/EmptyMyPoolList";
import { Footer } from "../../components/Footer";
import { Guesses } from "../../components/Guesses";
import { Header } from "../../components/Header";
import { MainContent } from "../../components/MainContent";
import { Option } from "../../components/Option";
import { IPoolCardProps } from "../../components/PoolCard";
import { PoolHeader } from "../../components/PoolHeader";
import { SectionContent } from "../../components/SectionContent";
import { Loading } from "../../components/Loading";

import { api } from "../../lib/axios";

export default function Details() {
  const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">(
    "guesses"
  );

  const [loading, setLoading] = useState(false);

  const [poolDetails, setPoolDetails] = useState<IPoolCardProps>(
    {} as IPoolCardProps
  );

  const navigate = useRouter();

  const { id } = navigate.query;

  async function getPoolsDetails() {
    setLoading(true);

    try {
      const { data } = await api.get(`/pools/${id}`);

      console.log(data.pool);

      setPoolDetails(data.pool);
    } catch (error) {
      toast.error("Não foi possivel carregar os bolões!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPoolsDetails();
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
      <Header title={poolDetails.title} showBackButton />

      <SectionContent>
        {poolDetails._count?.participants > 0 ? (
          <>
            <PoolHeader data={poolDetails} />

            <div className='flex gap-1 bg-gray-800 p-1 rounded-sm mb-5 w-full'>
              <Option
                title='Seus Palpites'
                isSelected={optionSelected === "guesses"}
                onClick={() => setOptionSelected("guesses")}
              />

              <Option
                title='Ranking do Grupo'
                isSelected={optionSelected === "ranking"}
                onClick={() => setOptionSelected("ranking")}
              />
            </div>

            <Guesses poolId={poolDetails.id} code={poolDetails.code} />
          </>
        ) : (
          <EmptyMyPoolList code={poolDetails.code} />
        )}
      </SectionContent>

      <Footer />
    </MainContent>
  );
}
