import { useLocation } from "react-router-dom";

const useUrlParse = () => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};

export default useUrlParse;
