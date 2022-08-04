import { Inject, Service } from "typedi";
import { AuthResponseDTO, UserRegistrationDTO, UserResponseDTO } from "../@types/dto/AuthenticationDto";
import { EmailRegistered } from "../@types/errors/EmailRegistered";
import { UserOrPasswordInvalid } from "../@types/errors/UserPasswordInvalid";
import { IUserRepository } from "../@types/repositories/IUserRepository";
import { IAuthenticationService } from "../@types/services/IAuthenticationService";
import { hashPassword } from "../helpers/HashPassword";
import { generateToken } from "../helpers/Token";


@Service("AuthenticationService")
export class AuthenticationService implements IAuthenticationService {
  constructor(
    @Inject("UserRepository") private userRepository: IUserRepository
  ) { }


  async authenticate(login: string, password: string): Promise<AuthResponseDTO> {
    const registeredUser = await this.userRepository.findOne({ email: login });
    if (!registeredUser) {
      throw new UserOrPasswordInvalid();
    }
    if (registeredUser.password !== hashPassword(password)) {
      throw new Error("Invalid password");
    }
    return generateToken({
      id: registeredUser.id,
      role: registeredUser.role
    })
  }

  async userSignup(user: UserRegistrationDTO): Promise<UserResponseDTO> {
    const hash = hashPassword(user.password);
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