import { useState } from "react";
import { EmptyMyPoolList } from "../../components/EmptyMyPoolList";
import { Footer } from "../../components/Footer";
import { Guesses } from "../../components/Guesses";

import { Header } from "../../components/Header";
import { MainContent } from "../../components/MainContent";
import { Option } from "../../components/Option";
import { IPoolCardProps } from "../../components/PoolCard";
import { PoolHeader } from "../../components/PoolHeader";
import { SectionContent } from "../../components/SectionContent";

import { pool } from "../../utils/mocks/pools";

export default function Details() {
  const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">(
    "guesses"
  );

  const [poolDetails, setPoolDetails] = useState<IPoolCardProps>(
    {} as IPoolCardProps
  );

  return (
    <MainContent>
      <Header title='Bolão do Rodrigão' />

      <SectionContent>
        <PoolHeader data={pool} />

        {poolDetails._count?.participants > 0 ? (
          <>
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
