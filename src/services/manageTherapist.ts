import api from "@/libs/hooks/axiosInstance";

export const manageTherapist = {
  getAllTherapistByService: (req: string) =>
    api.get(`/therapist/by-service/${req}`),
};
