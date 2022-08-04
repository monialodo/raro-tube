import { User } from "../../models/userEntity";
import { AuthResponseDTO, UserResponseDTO } from "../dto/AuthenticationDto";



export interface IAuthenticationService {
  authenticate(login: string, senha: string): Promise<AuthResponseDTO>;
  userSignup(user: User): Promise<UserResponseDTO>;
}
