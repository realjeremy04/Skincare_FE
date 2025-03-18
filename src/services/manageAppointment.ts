import api from "@/libs/hooks/axiosInstance";
import apiFile from "@/libs/hooks/fileInstance";
import { UpdateAppointment } from "@/types/appointment";

export const manageAppointment = {
  getAllAppointmentByTherapist: (req: string) =>
    api.get(`/appointment/account/${req}`),
  getAllAppointmentByCustomer: (req: string) =>
    api.get(`/appointment/customer/${req}`),
  getAppointmentDetail: (req: string) => api.get(`/appointment/${req}`),
  updateAppointment: (id: string, req: FormData) =>
    apiFile.patch(`/appointment/${id}`, req),
};
