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
import { generatePassToken, generateToken } from "../helpers/Token";
import { forgotTemplate } from "../public/emails/forgotTemplate";




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
    const { name, email, password, token } = signupData
    
    const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    
    if (!decoded) {
      throw new ForbiddenError("You must provide a code to signup");
    }
    
    const user = await this.userRepository.findByEmail(decoded.email);
    if (!email) {
      throw new ForbiddenError("You must provide a email to signup");
    }

    const userToken = generatePassToken(
      {
        id: user.id,
        role: user.role,
      },
    )
    const token_user = userToken.token;
    const newUser = await this.userRepository.save(plainToInstance(UserDto, {
      ...user,
      name: name || user.name,
      password: hashPassword(password) || hashPassword(user.password),
    }));
    console.log('token', token_user);
    

    return {
      user: newUser,
      token: token_user,
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
        id: user.id,
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

    const resetToken = generatePassToken({
      id: user.id,
      role: user.role,
    })
    const token = resetToken.token;

    await this.userRepository.save(plainToInstance(UserDto, { ...user, token }));


    const options = {
      subject: "Raro Tube | Reset Password",
      html: forgotTemplate(token),
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


