import { sign, verify } from "jsonwebtoken";
import { UserTokenDTO } from "../@types/dto/AuthenticationDto";


export const checkToken = (token: string): UserTokenDTO => {
  console.log('token', token);

  return verify(token, process.env.JWT_SECRET) as UserTokenDTO;
}

export const generateToken = (user: UserTokenDTO) => {

  const token: string = sign(user, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    token,
  }
}




