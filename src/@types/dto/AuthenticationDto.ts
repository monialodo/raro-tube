import { User } from "../../models/userEntity"

export interface LoginDTO {
  name: string
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

export interface UserTokenDTO {
  role: string

}

export interface UserResponseDTO {
  name: string
  email: string
  role: string
}


export interface AuthResponseDTO {
  token: string
  role: string
}