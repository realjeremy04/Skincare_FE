import { useSelector } from "react-redux";
import { RootState } from "@/stores";

export const useShift = () => {
  const { loading, shift } = useSelector(
    (state: RootState) => state.manageShift
  );
  return { loading, shift };
};
