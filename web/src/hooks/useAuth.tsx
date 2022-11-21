import { useContext } from "react";

import { AuthContext, IAuthContextProps } from "../contexts/AuthContext";

export const useAuth = (): IAuthContextProps => {
  const context = useContext(AuthContext);

  return context;
};
