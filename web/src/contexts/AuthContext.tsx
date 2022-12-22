import { createContext, ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useGoogleLogin } from "@react-oauth/google";

import { api } from "../lib/axios";

interface IUser {
  name: string;
  avatarUrl: string;
  token: string;
}

export interface IAuthContextProps {
  isUserLogged: boolean;
  user: IUser;
  signIn: () => void;
  logout: () => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthContextProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  const navigate = useRouter();

  const signIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      signInWithGoogle(tokenResponse.access_token);
      /*  const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      );

      console.log(userInfo); */
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  function loadStorage() {
    const userInStorage = localStorage.getItem("user");

    if (userInStorage) {
      const userStorage = JSON.parse(userInStorage);

      localStorage.setItem("user", JSON.stringify(userStorage));

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userStorage.token}`;

      setUser(userStorage);
    } else {
      navigate.push("/");
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      const { data: dataToken } = await api.post("/users", { access_token });

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${dataToken.token}`;

      const { data: dataUser } = await api.get("/me");

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${dataToken.token}`;

      const userInfo = {
        ...dataUser,
        token: dataToken.token,
      };

      localStorage.setItem("user", JSON.stringify(userInfo));

      setUser(userInfo);

      navigate.push("/pools");
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    setUser({} as IUser);

    localStorage.clear();

    navigate.push("/");
  }

  useEffect(() => {
    loadStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isUserLogged: !!user,
        user,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
