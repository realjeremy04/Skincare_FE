import { useSelector } from "react-redux";
import { RootState } from "@/stores";

export const useService = () => {
  const { loading, services, serviceDetail } = useSelector(
    (state: RootState) => state.manageService
  );
  return { loading, services, serviceDetail };
};
