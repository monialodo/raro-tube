import { User } from "../../models/userEntity"
import { UserDto } from "./UserDto";

export interface LoginDTO {
  email: string
  password: string
}

export class UserRegistrationDTO extends User {
  constructor(user: User) {
    super();
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
}
}

export interface SignupDto {
  name: string;
  email: string;
  password: string;
  code: string;
}

export interface UserTokenDTO {
  role: string

}

export interface UserResponseDTO {
  name: string
  email: string
  role: string
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
  confirmPassword: string;
  code: string;
}
