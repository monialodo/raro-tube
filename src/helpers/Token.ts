import { sign, verify } from "jsonwebtoken";
import { AuthResponseDTO, UserTokenDTO } from "../@types/dto/AuthenticationDto";


export const checkToken = (token: string): UserTokenDTO => {
  return verify(token, process.env.JWT_SECRET) as UserTokenDTO;
}

export const generateToken = (user: UserTokenDTO): AuthResponseDTO => {
  const token = sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token, role: user.role };


}