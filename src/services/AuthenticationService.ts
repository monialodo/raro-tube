import { plainToInstance } from "class-transformer";
import { Inject, Service } from "typedi";
import { AuthResponseDTO, LoginDTO, ResetPasswordDto, SignupDto } from "../@types/dto/AuthenticationDto";
import { UserDto } from "../@types/dto/UserDto";
import { ForbiddenError } from "../@types/errors/ForbiddenError";
import { InvalidEmailOrPassword } from "../@types/errors/InvalidEmailOrPassword";
import { UserOrPasswordInvalid } from "../@types/errors/UserPasswordInvalid";
import { IUserRepository } from "../@types/repositories/IUserRepository";
import { IAuthenticationService } from "../@types/services/IAuthenticationService";
import { hashPassword } from "../helpers/HashPassword";
import { sendEmail } from "../helpers/sendEmail";
import { generateToken, resetPassToken } from "../helpers/Token";



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

  async signup(signupData: SignupDto): Promise<AuthResponseDTO> {
    const { name, email, password, code } = signupData;
    if (!code) {
      throw new ForbiddenError("You must provide a code to signup");
    }
    const user = await this.userRepository.findByEmail(email);

    if (!email) {
      throw new ForbiddenError("You must provide a email to signup");
    }

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
    
    const user = await this.userRepository.findByEmailAndPassword(loginData);
   if (!user) {
      throw new InvalidEmailOrPassword();
    }
    
    if (user.password !== hashPassword(password) || !email) {
      throw new InvalidEmailOrPassword();
    }

    const userToken = generateToken(
      {
        email: user.email,
        role: user.role,
      }
    )    
    const token = userToken.token;    
    return {
      user,
      token,
    };
 
  }
  async forgot(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new ForbiddenError();
    }
 
    const resetToken = resetPassToken({
      email: user.email,
      id: user.id,
    })
    const token = resetToken.token;

    await this.userRepository.save(plainToInstance(UserDto, { ...user, token }));


    const options = {
      subject: "Reset Password | Daniel",
      text: `Here is your token to reset your password: ${token}.
        Please copy and paste it in the browser to reset your password.
        If you did not request this, please ignore this email and your password will remain unchanged.`,

    };
    await sendEmail(email, options);

  }

  async resetPassword(ResetPasswordDto: ResetPasswordDto): Promise<void> {
    const { password, token } = ResetPasswordDto;

    if (!token) {
      throw new ForbiddenError("You must provide a token to reset your password");
    }
    const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

    const user = await this.userRepository.findOne(decoded.id);
    if (!user) {
      throw new ForbiddenError("User not found");
    }
    const passwordHash = hashPassword(password);

    await this.userRepository.save(plainToInstance(UserDto, { ...user, passwordHash }));
  }
}


