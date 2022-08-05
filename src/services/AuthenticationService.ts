import { plainToInstance } from "class-transformer";
import { Inject, Service } from "typedi";
import { AuthResponseDTO, LoginDTO, ResetPasswordDto, SignupDto, UserRegistrationDTO, UserResponseDTO } from "../@types/dto/AuthenticationDto";
import { UserDto } from "../@types/dto/UserDto";
import { ForbiddenError } from "../@types/errors/ForbiddenError";
import { InvalidEmailOrPassword } from "../@types/errors/InvalidEmailOrPassword";
import { UserOrPasswordInvalid } from "../@types/errors/UserPasswordInvalid";
import { IUserRepository } from "../@types/repositories/IUserRepository";
import { IAuthenticationService } from "../@types/services/IAuthenticationService";
import { hashPassword } from "../helpers/HashPassword";
import { sendEmail } from "../helpers/sendEmail";
import { generateToken } from "../helpers/Token";
import { User } from "../models/userEntity";


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

  async signup(signupData: SignupDto): Promise<AuthResponseDTO> {
    const { name, email, password, code } = signupData;

    // Replace this line after implementing the token verification
    if (!code) {
      throw new ForbiddenError("You must provide a code to signup");
    }

    // Replace this line after implementing the token generation
    const tokenMock = "hgjfdsjf3ghtrh45.h5h54hg54g54g54gh54h.h5445h5h454h45h54h";

    const user = await this.userRepository.findByEmail(email);
    const newUser = await this.userRepository.save(plainToInstance(UserDto, {
      ...user,
      name: name || user.name,
      password: password || user.password,
    }));

    return {
      user: newUser,
      token: tokenMock,
    }
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

  async login(loginData: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.findByEmailAndPassword(loginData);

    if (!user) {
      throw new InvalidEmailOrPassword();
    }

    // Replace this line after implementing the token generation
    const tokenMock = "hgjfdsjf3ghtrh45.h5h54hg54g54g54gh54h.h5445h5h454h45h54h";

    return {
      user,
      token: tokenMock,
    };
  }

  async forgot(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    // Replace this line after implementing the token generation
    const tokenMock = "hgjfdsjf3ghtrh45.h5h54hg54g54g54gh54h.h5445h5h454h45h54h";

    if (user) {
      const options = {
        subject: "Reset Password | Daniel",
        text: `Here is your code to reset your password: ${tokenMock}`,
      };
      await sendEmail(email, options);
    }
  }

  async code(ResetPasswordDto: ResetPasswordDto): Promise<void> {
    const { password, confirmPassword, code } = ResetPasswordDto;
    // Replace this line after implementing the token verification
    if (!code) {
      throw new ForbiddenError("You must provide a code to reset your password");
    }

    if (password !== confirmPassword) {
      throw new ForbiddenError("Passwords do not match");
    }

    // Replace this line after implementing the token generation
    const id = '1889ccd9-2139-4cce-88d6-be913603a6a9';

    const user = await this.userRepository.findOne(id);
    await this.userRepository.save(plainToInstance(UserDto, { ...user, password }))
  }
}


