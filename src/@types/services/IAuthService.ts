import { AuthReturnDto, LoginDto, SignupDto, ResetPasswordDto} from "../dto/AuthDto";

export interface IAuthService {
  signup(signupData: SignupDto): Promise<AuthReturnDto>;
  login(loginData: LoginDto): Promise<AuthReturnDto>;
  forgot(email : string): Promise<void>;
  code(ResetPasswordDto : ResetPasswordDto): Promise<void>;
}
