import axios from "axios";

const apiFile = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export default apiFile;
