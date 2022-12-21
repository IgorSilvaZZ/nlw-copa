import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";

import { Game, IGameProps } from "../Game";
import { Loading } from "../Loading";

interface IGuessesProps {
  poolId: string;
  code: string;
}

export const Guesses = ({ code, poolId }: IGuessesProps) => {
  const [games, setGames] = useState<IGameProps[]>([]);

  const [loading, setLoading] = useState(false);

  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");

  async function getGames() {
    setLoading(true);

    try {
      const { data } = await api.get(`/pools/${poolId}/games`);

      setGames(data.games);
    } catch (error) {
      console.error(error);

      toast.error("Não foi poissivel carregar os Jogos!");
    } finally {
      setLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.error("Informe o placar do palpite!");
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.success("Palpite realizado com sucesso!");

      getGames();
    } catch (error) {
      console.error(error);

      toast.error("Não foi possivel enviar o palpite!");
    }
  }

  useEffect(() => {
    getGames();
  }, [poolId]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {games && games.length > 0 && (
            <>
              {games.map((game) => (
                <Game
                  data={game}
                  onGuessConfirm={() => handleGuessConfirm(game.id)}
                  setFirstTeamPoints={(e) =>
                    setFirstTeamPoints(e.currentTarget.value)
                  }
                  setSecondTeamPoints={(e) =>
                    setSecondTeamPoints(e.currentTarget.value)
                  }
                />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};
