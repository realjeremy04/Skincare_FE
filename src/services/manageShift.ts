import api from "@/libs/hooks/axiosInstance";

export const manageShift = {
  getAllShiftByTherapist: (req: string) =>
    api.get(`/shifts/therapist/upcoming/${req}`),
  getAllShiftByAccount: (req: string) =>
    api.get(`/shifts/account/upcoming/${req}`),
};
