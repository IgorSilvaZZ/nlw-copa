import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import { api } from "../services/api";

WebBrowser.maybeCompleteAuthSession();

interface IUserProps {
  name: string;
  avatarUrl: string;
}

export interface IAuthContextDataProps {
  user: IUserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextDataProps);

export function AuthContextProvider({ children }: IAuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState<IUserProps>({} as IUserProps);

  const [req, res, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({
      useProxy: true,
    }),
    scopes: ["profile", "email"],
  });

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true);

      const { data: dataToken } = await api.post("/users", { access_token });

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${dataToken.token}`;

      const { data: dataUser } = await api.get("/me");

      setUser(dataUser.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUserLoading(false);
    }
  }
  ("");

  useEffect(() => {
    if (res?.type === "success" && res.authentication?.accessToken) {
      signInWithGoogle(res.authentication.accessToken);
    }
  }, [res]);

  return (
    <AuthContext.Provider
      value={{
        isUserLoading,
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
