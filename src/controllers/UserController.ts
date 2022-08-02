import { Request, Response } from "express";
import { Inject, Service } from "typedi";

import { IUserService } from "../@types/services/IUserService";

@Service("UserController")
export class UserController {
  constructor(
    @Inject("UserService")
    private readonly userService: IUserService
  ) {}

  async findAll(request: Request, response: Response) {
    const users = await this.userService.findAll();
    response.send(users);
  }

  async find(request: Request, response: Response) {
    const user = await this.userService.findOne(request.params.id);
    response.send(user);
  }

  async create(request: Request, response: Response) {
    const user = await this.userService.create(request.body);
    response.status(201).send(user);
  }

  async update(request: Request, response: Response) {
    const user = await this.userService.update(request.params.id, request.body);
    response.send(user);
  }

  async delete(request: Request, response: Response) {
    await this.userService.delete(request.params.id);
    response.send();
  }
}
