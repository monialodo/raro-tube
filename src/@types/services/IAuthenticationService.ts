import { User } from "../../models/userEntity";
import { AuthResponseDTO, UserRegistrationDTO, UserResponseDTO } from "../dto/AuthenticationDto";



export interface IAuthenticationService {
  authenticate(login: string, senha: string): Promise<AuthResponseDTO>;
  create(user: UserRegistrationDTO): Promise<UserResponseDTO>;
}
