import { AuthResponseDTO, LoginDTO, ResetPasswordDto, SignupDto, UserRegistrationDTO, UserResponseDTO } from "../dto/AuthenticationDto";



export interface IAuthenticationService {
  authenticate(login: string, senha: string): Promise<AuthResponseDTO>;
  signup(signupData: SignupDto): Promise<AuthResponseDTO>;
  create(user: UserRegistrationDTO): Promise<UserResponseDTO>;
  login(loginData: LoginDTO): Promise<AuthResponseDTO>;
  forgot(email: string): Promise<void>;
  code(ResetPasswordDto: ResetPasswordDto): Promise<void>;


}
