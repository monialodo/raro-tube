import { sign, verify } from "jsonwebtoken";
import { CreateUserTokenDTO, UserResetPasswordDTO, UserResponseDTO, UserTokenDTO } from "../@types/dto/AuthenticationDto";


export const generateToken = (user: UserTokenDTO) => {

  const token: string = sign(user, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    token,
  }
}

export const generatePassToken = (user: UserResetPasswordDTO) => {

  const token: string = sign(user, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
  
    return {
      token,
    }
  }


  export const createUserToken = (user: CreateUserTokenDTO) => {

    const token: string = sign(user, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
    
      return {
        token,
      }
    }
  



