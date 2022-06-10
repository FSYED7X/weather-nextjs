import { useQuery } from "react-query";
// import { useSearchParams } from "react-router-dom";

export const useTheQuery = (queryKeys, apiCall, options) => {
  // const { notify } = useAppContext();

  return useQuery(queryKeys, apiCall, {
    cacheTime: 300000,
    staleTime: 300000,
    onError: (error) => alert(error.message, "error"),
    ...options,
  });
};

// export const useSearchParameters = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   return {
//     searchParams: Object.fromEntries(searchParams.entries()),
//     setSearchParams,
//   };
// };
