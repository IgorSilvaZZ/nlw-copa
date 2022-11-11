import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Heading, VStack, useToast } from "native-base";

import { api } from "../services/api";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const Find = () => {
  const [isLoading, setIsloading] = useState(false);
  const [code, setCode] = useState("");

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handlePoolJoin() {
    try {
      setIsloading(true);

      if (!code.trim()) {
        return toast.show({
          title: "Informe o codigo do Bolão!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/pools/join", { code });

      navigate("pools");

      return toast.show({
        title: "Você entrou no bolão com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      setIsloading(false);

      console.log(error);

      if (error.response?.data?.message === "Pool not Found") {
        return toast.show({
          title: "Bolão não encontrado!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.response?.data?.message === "You already joined this pool") {
        return toast.show({
          title: "Você já esta nesse bolão!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Você já esta nesse bolão!",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Buscar por código' showBackButton />

      <VStack mt={8} mx={5} alignItems='center'>
        <Heading
          fontFamily='heading'
          color='white'
          fontSize='xl'
          textAlign='center'
          mb={8}
        >
          Encontre um bolão através de {"\n"} seu código único
        </Heading>

        <Input
          mb={2}
          placeholder='Qual o codigo do bolão?'
          onChangeText={setCode}
          autoCapitalize='characters'
        />

        <Button
          title='BUSCAR BOLÃO'
          isLoading={isLoading}
          onPress={handlePoolJoin}
        />
      </VStack>
    </VStack>
  );
};
