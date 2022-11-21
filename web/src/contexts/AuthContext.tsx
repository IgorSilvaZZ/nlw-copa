import { createContext, ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useGoogleLogin } from "@react-oauth/google";

import { api } from "../lib/axios";

interface IUser {
  name: string;
  avatarUrl: string;
}

export interface IAuthContextProps {
  isUserLogged: boolean;
  user: IUser;
  signIn: () => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthContextProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  const router = useRouter();

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

  async function signInWithGoogle(access_token: string) {
    try {
      const { data: dataToken } = await api.post("/users", { access_token });

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${dataToken.token}`;

      const { data: dataUser } = await api.get("/me");
      setUser(dataUser);

      router.push("/pools");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(user);
    if (!user.name) {
      router.push("/");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isUserLogged: !!user,
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
