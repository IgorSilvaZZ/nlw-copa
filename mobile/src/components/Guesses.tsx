import { useState, useEffect } from "react";
import { Box, useToast, FlatList } from "native-base";

import { Game, GameProps } from "./Game";
import { Loading } from "./Loading";
import { EmptyMyPoolList } from "./EmptyMyPoolList";

import { api } from "../services/api";
interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<GameProps[]>([]);

  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secundTeamPoints, setSecundTeamPoints] = useState("");

  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);

      const {
        data: { games },
      } = await api.get(`/pools/${poolId}/games`);

      setGames(games);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possivel carregar os Jogos!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secundTeamPoints.trim()) {
        return toast.show({
          title: "Informe o placar do palpite!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secundTeamPoints: Number(secundTeamPoints),
      });

      toast.show({
        title: "Palpite realizado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      fetchGames();
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possivel enviar o palpite!",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecundTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
    />
  );
}
