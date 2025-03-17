export interface LoginResponse {
  message: string;
  user: User;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  dob: Date;
  phone: string;

  role: string;
  isActive: boolean;
  token?: string;
}
