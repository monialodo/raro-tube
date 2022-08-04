// import { Request, Response } from "express";
// import { Inject, Service } from "typedi";
// import { IAuthenticationService } from "../@types/services/IAuthenticationService";

// @Service('AuthenticationController')
// export class AuthenticationController {
//   constructor(
//     @Inject('AuthenticationService') private authService: IAuthenticationService
//   ) { }

//   async authenticate(request: Request, response: Response) {
//     const email = request.header('email');
//     const password = request.header('password');
//     const token = await this.authService.authenticate(email, password);
//     response.status(200).send(token);
//   }

//   async create(request: Request, response: Response) {
//     const user = await this.authService.userSignup(request.body);
//     response.status(201).send(user);
//   }
// }
