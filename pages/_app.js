import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import useAuthStore from "../store/useAuthStore";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  const { user, setUser } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    !isEmpty(user) && router.push("/", undefined, { shallow: true });
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
