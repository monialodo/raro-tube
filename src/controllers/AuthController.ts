import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IAuthService } from "../@types/services/IAuthService";


@Service("AuthController")
export class AuthController {
  constructor(
    @Inject("AuthService") private readonly authService: IAuthService
  ) {}
    async login(req: Request, res: Response) {
      const userWithToken = await this.authService.login(req.body);
      res.json(userWithToken);
    }

    async signup(req: Request, res: Response) {
      const userWithToken = await this.authService.signup(req.body);
      res.json(userWithToken);
    }

    async forgot(req: Request, res: Response) {
      const { email } = req.body;
      this.authService.forgot(email);
      res.status(200).json({ message: "Email sent!" });
    }

    async code(req: Request, res: Response) {
      this.authService.code(req.body);
      res.status(200).json({ message: "Code sent!" });
    }
}