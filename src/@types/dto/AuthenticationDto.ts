import { UserDto } from "./UserDto";

export interface LoginDTO {
  email: string
  password: string
}


export interface SignupDto {
  name: string;
  email: string;
  password: string;
  authToken: string;
}

export interface UserTokenDTO {
  id: string;
  role: string;
}

export interface UserResponseDTO {
  name: string
  email: string
  role: string
}

export interface UserResetPasswordDTO {
  id: string;
  role: string;
}

export interface AuthResponseDTO {
  user: UserDto;
  token: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  password: string;
  token: string;

}
