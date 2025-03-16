import { apiInstance } from "@/constants/api";

const api = apiInstance("/service");

export const manageService = {
  getAllService: () => api.get(`/`),
  getDetailService: (req: string) => api.get(`/${req}`),
};
