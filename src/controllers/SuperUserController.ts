import { Request, Response } from "express";
import { Inject, Service } from "typedi";

import { ISuperUserService } from "../@types/services/ISuperUserService";

@Service("SuperUserController")
export class SuperUserController {
  constructor(
    @Inject("SuperUserService")
    private readonly superUserService: ISuperUserService
  ) {}

  async findAll(request: Request, response: Response) {
    const superUser = await this.superUserService.findAll();
    console.log(superUser);
    response.send(superUser);
  }

  async find(request: Request, response: Response) {
    const superUser = await this.superUserService.findOne(request.params.id);
    response.send(superUser);
  }

  async create(request: Request, response: Response) {
    const superUser = await this.superUserService.create(request.body);
    response.status(201).send(superUser);
  }

  async update(request: Request, response: Response) {
    const superUser = await this.superUserService.update(
      request.params.id,
      request.body
    );
    response.send(superUser);
  }

  async delete(request: Request, response: Response) {
    await this.superUserService.delete(request.params.id);
    response.send();
  }
}
