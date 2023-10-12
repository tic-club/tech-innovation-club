export type User = {
  id: number;
  gr_no: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  gender: string;
  branch: string;
  bio: string | null;
  avatarUrl: string | null;
  forgotPasswordToken: string | null;
  isAdmin: boolean;
};
