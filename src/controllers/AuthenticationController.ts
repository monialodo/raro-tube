import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { IAuthenticationService } from "../@types/services/IAuthenticationService";

@Service("AuthenticationController")
export class AuthenticationController {
  constructor(
    @Inject("AuthenticationService") private readonly authService: IAuthenticationService
  ) { }

  async authenticate(request: Request, response: Response) {
    const email = request.header('email');
    const password = request.header('password');
    const token = await this.authService.authenticate(email, password);
    response.status(200).send(token);
  }

  async login(req: Request, res: Response) {

    const userWithToken = await this.authService.login(req.body);
    console.log('userWithToken', userWithToken);

    res.json(userWithToken);
  }

  async signup(req: Request, res: Response) {    
    const userWithToken = await this.authService.signup(req.body);
    res.json(userWithToken);
  }

  async forgot(req: Request, res: Response) {
    const { email } = req.body;
    await this.authService.forgot(email);
    res.status(200).json({ message: "Email sent!"});
  }

  async resetPassword(req: Request, res: Response) {

    await this.authService.resetPassword(req.body);
    res.status(200).json({ message: "Password updated" });
  }

}
