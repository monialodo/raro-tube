import { plainToInstance } from "class-transformer";
import { Inject, Service } from "typedi";
import {
  LoginDto,
  AuthReturnDto,
  SignupDto,
  ResetPasswordDto,
} from "../@types/dto/AuthDto";
import { UserDto } from "../@types/dto/UserDto";
import { ForbiddenError } from "../@types/errors/ForbiddenError";

import { InvalidEmailOrPassword } from "../@types/errors/InvalidEmailOrPassword";
import { IUserRepository } from "../@types/repositories/IUserRepository";
import { IAuthService } from "../@types/services/IAuthService";
import { sendEmail } from "../helpers/sendEmail";

@Service("AuthService")
export class AuthService implements IAuthService {
  constructor(
    @Inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async signup(signupData: SignupDto): Promise<AuthReturnDto> {
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

  async login(loginData: LoginDto): Promise<AuthReturnDto> {
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
    await this.userRepository.save(plainToInstance(UserDto, {...user, password}))
  }
}
