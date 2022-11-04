import { useContext } from "react";
import { FetchDataContext } from "../context/FetchContext";

function useInitialize() {
  return useContext(FetchDataContext);
}

export default useInitialize;
