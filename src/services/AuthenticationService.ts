import { Inject, Service } from "typedi";
import { AuthResponseDTO, UserRegistrationDTO, UserResponseDTO } from "../@types/dto/AuthenticationDto";
import { EmailRegistered } from "../@types/errors/EmailRegistered";
import { UserOrPasswordInvalid } from "../@types/errors/UserPasswordInvalid";
import { IUserRepository } from "../@types/repositories/IUserRepository";
import { IAuthenticationService } from "../@types/services/IAuthenticationService";
import { hashSenha } from "../helpers/HashSenha";
import { generateToken } from "../helpers/Token";


@Service("AuthenticationService")
export class AuthenticationService implements IAuthenticationService {
  constructor(
    @Inject("UserRepository") private userRepository: IUserRepository
  ) { }
 

  async authenticate(login: string, senha: string): Promise<AuthResponseDTO> {
    const registeredUser = await this.userRepository.findOne({ login });
    if (!registeredUser) {
      throw new UserOrPasswordInvalid();
    }
    if (registeredUser.password !== hashSenha(senha)) {
      throw new Error("Invalid password");
    }
    return generateToken({
      id: registeredUser.id,
      role: registeredUser.role
    })
  }

  async userSignup(user: UserRegistrationDTO): Promise<UserResponseDTO> {
    const hash = hashSenha(user.password);
    const registeredUser = await this.userRepository.findOne(user.email);
    if (registeredUser) {
      throw new EmailRegistered();
    }

    const newUser = await this.userRepository.create({ ...user, password: hash });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }

  }


}