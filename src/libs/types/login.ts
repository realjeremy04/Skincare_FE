export interface LoginResponse {
  message: string;
  user: User;
}

export interface User {
  username: string;
  email: string;
  dob: Date;
  role: string;
  isActive: boolean;
  token?: string;
}
