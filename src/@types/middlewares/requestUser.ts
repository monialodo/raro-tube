import { UserTokenDTO } from "../dto/AuthenticationDto";
import { Request } from "express";


export interface RequestUser extends Request {
  user: UserTokenDTO
}
