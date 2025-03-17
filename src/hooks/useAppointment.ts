import { useSelector } from "react-redux";
import { RootState } from "@/stores";

export const useAppointment = () => {
  const { loading, appointment, detail } = useSelector(
    (state: RootState) => state.manageAppointment
  );
  return { loading, appointment, detail };
};
