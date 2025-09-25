export interface LoginPayload {
  username: string;
  password: string;
}

export interface VerifyOTPPayload {
  username: string;
  otp: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  countryId: string;
  password: string;
  isActive: boolean;
  is2faEnabled: boolean;
  isVerified: boolean;
  created_at: string;
  updated_at: string;
}

export interface IUserDTO {
  username: string;
  email: string;
  password?: string;
  countryId: number;
}
