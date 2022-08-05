import { Inject, Service } from "typedi";
import { AuthResponseDTO, UserRegistrationDTO, UserResponseDTO } from "../@types/dto/AuthenticationDto";
import { EmailRegistered } from "../@types/errors/EmailRegistered";
import { UserOrPasswordInvalid } from "../@types/errors/UserPasswordInvalid";
import { IUserRepository } from "../@types/repositories/IUserRepository";
import { IAuthenticationService } from "../@types/services/IAuthenticationService";
import { hashPassword } from "../helpers/HashPassword";
import { generateToken } from "../helpers/Token";
import { User } from "../models/userEntity";
import { plainToInstance } from "class-transformer";

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
      role: registeredUser.role,

    })
  }

  async create(user: UserRegistrationDTO): Promise<UserResponseDTO> {
    console.log('Registrando usuário');

    const hash = hashPassword(user.password);
    console.log('Hash: ', hash);

    // const registeredUser = await this.userRepository.findOne(user.email);
    // console.log('Usuário registrado: ', registeredUser);

    // if (registeredUser) {
    //   throw new EmailRegistered();
    // }

    const newUser: UserRegistrationDTO = new User();
    console.log('Usuário criado: ', newUser);

    newUser.name = user.name;
    console.log('Nome: ', newUser.name);

    newUser.email = user.email;
    console.log('Email: ', newUser.email);

    newUser.password = hash;
    newUser.role = user.role;
    console.log('Usuário criado: ', newUser);
    console.log('Passou no service');
    

    // const teste = plainToInstance(User, newUser);

    return this.userRepository.save(newUser);





  }


}