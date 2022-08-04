import { UserTokenDTO } from "../dto/AuthenticationDto";
import { Request } from "express";


export interface RequestUsuer extends Request {
  user: UserTokenDTO
}
