import api from "@/libs/hooks/axiosInstance";

export const manageSlot = {
  getAllSlots: () => api.get(`/slots`),
};
