import { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { VStack, Icon, useToast, FlatList } from "native-base";
import { Octicons } from "@expo/vector-icons";

import { api } from "../services/api";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { PoolCard, PoolPros } from "../components/PoolCard";
import { Loading } from "../components/Loading";
import { EmptyPoolList } from "../components/EmptyPoolList";

export const Pools = () => {
  const { navigate } = useNavigation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [pools, setPools] = useState<PoolPros[]>([]);

  async function fetchPools() {
    try {
      setIsLoading(true);

      const { data } = await api.get("/pools");

      setPools(data);
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
    fetchPools();
  }, []);

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Meus Bolões' />

      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor='gray.600'
        pb={4}
        mb={4}
      >
        <Button
          title='BUSCAR BOLÃO POR CÓDIGO'
          leftIcon={
            <Icon as={Octicons} name='search' color='black' size='md' />
          }
          onPress={() => navigate("find")}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PoolCard data={item} />}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            pb: 10,
          }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      )}
    </VStack>
  );
};