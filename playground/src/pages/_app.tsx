import { type AppType } from "next/app";

// import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ /* session: Session | null */ }> = ({
  Component,
  pageProps: { /* session, */  ...pageProps },
}) => {
  // <SessionProvider session={session}>
  return (
      <Component {...pageProps} />
  );
  // </SessionProvider>
};

// export default api.withTRPC(MyApp);
export default MyApp;
