import { useState, useEffect } from "react";
import { Share } from "react-native";
import { HStack, useToast, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import { Guesses } from "../components/Guesses";

import { api } from "../services/api";

interface IRouteParams {
  id: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(false);
  const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">(
    "guesses"
  );
  const [poolDetails, setPoolDetails] = useState<PoolPros>({} as PoolPros);

  const toast = useToast();

  const route = useRoute();

  const { id } = route.params as IRouteParams;

  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code,
    });
  }

  async function fetchPoolsDetails() {
    try {
      setIsLoading(true);

      const { data } = await api.get(`/pools/${id}`);

      setPoolDetails(data.pool);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possivel carregar os Bolões",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPoolsDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {poolDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />

          <HStack bgColor='gray.800' p={1} rounded='sm' mb={5}>
            <Option
              title='Seus Palpítes'
              isSelected={optionSelected === "guesses"}
              onPress={() => setOptionSelected("guesses")}
            />

            <Option
              title='Ranking do Grupo'
              isSelected={optionSelected === "ranking"}
              onPress={() => setOptionSelected("ranking")}
            />
          </HStack>

          <Guesses poolId={poolDetails.id} code={poolDetails.code} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  );
}
