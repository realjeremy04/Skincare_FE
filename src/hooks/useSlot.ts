import { useSelector } from "react-redux";
import { RootState } from "@/stores";

export const useSlot = () => {
  const { loading, slot } = useSelector((state: RootState) => state.manageSlot);
  return { loading, slot };
};
