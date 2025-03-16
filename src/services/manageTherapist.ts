import { apiInstance } from "@/constants/api";

const api = apiInstance("/therapist");

export const manageTherapist = {
  getAllTherapistByService: (req: string) => api.get(`/by-service/${req}`),
};
