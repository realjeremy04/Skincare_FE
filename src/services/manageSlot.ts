import { apiInstance } from "@/constants/api";

const api = apiInstance("/slots");

export const manageSlot = {
  getAllSlots: () => api.get(`/`),
};
