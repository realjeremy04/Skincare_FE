import apiFile from "@/libs/hooks/fileInstance";

export const manageFeedback = {
  createFeedback: (req: FormData) => apiFile.post(`/feedback`, req),
};
