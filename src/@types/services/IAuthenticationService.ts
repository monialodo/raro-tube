import { AuthResponseDTO, LoginDTO, ResetPasswordDto, SignupDto } from "../dto/AuthenticationDto";


export interface IAuthenticationService {
  authenticate(login: string, senha: string): Promise<AuthResponseDTO>;
  signup(signupData: SignupDto): Promise<AuthResponseDTO>;
  login(loginData: LoginDTO): Promise<AuthResponseDTO>;
  forgot(email: string): Promise<void>;
  resetPassword(ResetPasswordDto: ResetPasswordDto): Promise<void>;


}
