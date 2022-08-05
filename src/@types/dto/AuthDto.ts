import { UserDto } from "./UserDto";

export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto {
  name: string;
  email: string;
  password: string;
  code: string;
}

export interface AuthReturnDto {
  user: UserDto;
  token: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  password: string;
  confirmPassword: string;
  code: string;
}