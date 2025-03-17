import api from "@/libs/hooks/axiosInstance";

export const manageService = {
  getAllService: () => api.get(`/service`),
  getDetailService: (req: string) => api.get(`/service/${req}`),
};
