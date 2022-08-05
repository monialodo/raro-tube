import { Request } from "express";

export interface RequestUserDto extends Request {
  token: {
    id: string;
    role: string;
  }
}