import api from "@/libs/hooks/axiosInstance";
import { CreateTransaction } from "@/types/transaction";

export const manageTransaction = {
  createTransaction: (req: CreateTransaction) => api.post(`/transaction`, req),
  getTransactionByCustomer: (req: string) =>
    api.get(`/transaction/customer/${req}`),
};
