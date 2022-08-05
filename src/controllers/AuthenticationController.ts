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

  async create(request: Request, response: Response) {
    console.log('req', request.body);

    
    console.log('chegou no controller');
    
    const user = await this.authService.create(request.body);
    console.log('Usuário criado: ', user);
    
    response.status(201).send(user);
    console.log('Passou no controller');
  
  }
}
