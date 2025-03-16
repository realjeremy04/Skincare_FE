import { apiInstance } from "@/constants/api";
import { CreateTransaction } from "@/types/transaction";

const api = apiInstance("/transaction");

export const manageTransaction = {
  createTransaction: (req: CreateTransaction) => api.post(`/`, req),
};
