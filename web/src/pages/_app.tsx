import type { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "../styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleOAuthProvider clientId='1015394032078-kpia6tmedh0l71r5no1erm796ql385dp.apps.googleusercontent.com'>
        <AuthContextProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </AuthContextProvider>
      </GoogleOAuthProvider>
    </>
  );
}
