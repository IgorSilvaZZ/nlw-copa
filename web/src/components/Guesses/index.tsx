import { useState } from "react";
import { EmptyMyPoolList } from "../EmptyMyPoolList";
import { Game, IGameProps } from "../Game";
import { games as gamesMock } from "../../utils/mocks/games";

interface IGuessesProps {
  poolId: string;
  code: string;
}

export const Guesses = ({ code, poolId }: IGuessesProps) => {
  const [games, setGames] = useState<IGameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secundTeamPoints, setSecundTeamPoints] = useState("");

  async function handleGuessConfirm(gameId: string) {
    console.log(gameId);
  }

  // Retornar o mock de games para testar o componente visual

  return (
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
                setSecundTeamPoints(e.currentTarget.value)
              }
            />
          ))}
        </>
      )}
    </>
  );
};
