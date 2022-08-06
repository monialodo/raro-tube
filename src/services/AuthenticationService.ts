import { plainToInstance } from "class-transformer";
import { Inject, Service } from "typedi";
import { AuthResponseDTO, LoginDTO, ResetPasswordDto, SignupDto, UserRegistrationDTO, UserResponseDTO } from "../@types/dto/AuthenticationDto";
import { UserDto } from "../@types/dto/UserDto";
import { EmailRegistered } from "../@types/errors/EmailRegistered";
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
    return

  }

  async create(user: UserRegistrationDTO): Promise<UserResponseDTO> {
    const hash = hashPassword(Math.random().toString(16).substring(2, 12));

    const authCode = Math.random().toString(16).substring(2, 8)

    const registeredUser = await this.userRepository.findByEmail(user.email);

    if (registeredUser) {
      throw new EmailRegistered();
    }

    const newUser: UserRegistrationDTO = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = hash;
    newUser.role = user.role;

    await sendEmail(user.email, {
      subject: "Welcome to Monia",
      text: `Welcome to ${user.name}!
      Your authentication code is: ${authCode}`
    });
    return this.userRepository.save(newUser);
  }

  async signup(signupData: SignupDto): Promise<AuthResponseDTO> {
    const { name, email, password, code } = signupData;

    if (!code) {
      throw new ForbiddenError("You must provide a code to signup");
    }
    const user = await this.userRepository.findByEmail(email);
    const userToken = generateToken(
      {
        email: email,
        role: user.role,
      },
    )
    const token = userToken.token;
    const newUser = await this.userRepository.save(plainToInstance(UserDto, {
      ...user,
      name: name || user.name,
      password: hashPassword(password) || hashPassword(user.password),
    }));

    return {
      user: newUser,
      token,
    };
  }

  async login(loginData: LoginDTO): Promise<AuthResponseDTO> {
    const { email, password } = loginData;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidEmailOrPassword();
    }
    if (user.password !== hashPassword(password)) {
      throw new InvalidEmailOrPassword();
    }
    const userToken = generateToken(
      {
        email: user.email,
        role: user.role,
      }
    )
    console.log('token', userToken);

    const token = userToken.token;
    return {
      user,
      token,
    };
  }
  async forgot(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    const authCode = Math.random().toString(16).substring(2, 8)

    if (user) {
      const options = {
        subject: "Reset Password | Daniel",
        text: `Here is your code to reset your password: ${authCode}`,
      };
      await sendEmail(email, options);
    }
  }

  async resetPassword(ResetPasswordDto: ResetPasswordDto): Promise<void> {
    const { password, code } = ResetPasswordDto;
    if (!code) {
      throw new ForbiddenError("You must provide a code to reset your password");
    }
    const id = "3c8a91e3-ebd6-4ce0-b797-a750d48af416"
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new ForbiddenError("User not found");
    }

    const passwordHash = hashPassword(password);

    await this.userRepository.save(plainToInstance(UserDto, { ...user, passwordHash }));
  }
}


