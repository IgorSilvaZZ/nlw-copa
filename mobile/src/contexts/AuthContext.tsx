import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

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
    clientId:
      "1015394032078-kpia6tmedh0l71r5no1erm796ql385dp.apps.googleusercontent.com",
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
    console.log("Token de Autenticação", access_token);
  }

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
