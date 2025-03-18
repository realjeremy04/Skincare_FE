import { useSelector } from "react-redux";
import { RootState } from "@/stores";

export const useTransaction = () => {
  const { loading, transactions } = useSelector(
    (state: RootState) => state.manageTransaction
  );
  return { loading, transactions };
};
