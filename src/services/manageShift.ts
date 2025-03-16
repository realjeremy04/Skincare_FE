import { apiInstance } from "@/constants/api";

const api = apiInstance("/shifts");

export const manageShift = {
  getAllShiftByTherapist: (req: string) =>
    api.get(`/therapist/upcoming/${req}`),
};
