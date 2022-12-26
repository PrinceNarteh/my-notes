import type { NextComponentType } from "next";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../state/store";
import "../styles/globals.css";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
};

export default function App({ Component, pageProps }: CustomAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {Component.auth ? (
        <Auth>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Auth>
      ) : (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      )}
    </SessionProvider>
  );
}

function Auth({ children }: { children: React.ReactNode }) {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>children</>;
}
