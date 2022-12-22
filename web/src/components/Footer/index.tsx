import { useRouter } from "next/router";
import { PlusCircle, SoccerBall, SignOut } from "phosphor-react";
import classnames from "classnames";

import { useAuth } from "../../hooks/useAuth";

export const Footer = () => {
  const { logout } = useAuth();

  const navigate = useRouter();

  const routePathNameFormatter = navigate?.pathname.replace("/", "");

  const isRouteNew = routePathNameFormatter === "new";
  const isRoutePools = ["pools", "find", "details"].includes(
    routePathNameFormatter
  );

  return (
    <div className='w-full fixed bottom-0 flex items-center justify-center gap-5 bg-gray-800 p-5 mt-2'>
      <button
        className={classnames("flex items-center gap-2", {
          "text-gray-500": !isRouteNew,
          "text-yellow-500": isRouteNew,
        })}
      >
        <PlusCircle />
        <span onClick={() => navigate.push("/new")}>Novo Bolão</span>
      </button>
      <button
        className={classnames("flex items-center gap-2", {
          "text-gray-500": !isRoutePools,
          "text-yellow-500": isRoutePools,
        })}
      >
        <SoccerBall />
        <span onClick={() => navigate.push("/pools")}>Meus Bolões</span>
      </button>

      <button className='flex items-center gap-2 text-gray-500'>
        <SignOut onClick={() => logout()} />

        <span>Sair</span>
      </button>
    </div>
  );
};
