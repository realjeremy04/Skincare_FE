import { useSelector } from "react-redux";
import { RootState } from "@/stores";

export const useTherapist = () => {
  const { loading, therapist } = useSelector(
    (state: RootState) => state.manageTherapist
  );
  return { loading, therapist };
};
