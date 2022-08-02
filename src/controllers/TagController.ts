import { Request, Response } from "express";
import { Inject, Service } from "typedi";

import { ITagService } from "../@types/services/ITagService";

@Service("TagController")
export class TagController {
  constructor(@Inject("TagService") private readonly TagService: ITagService) {}

  async findAll(request: Request, response: Response) {
    const Tags = await this.TagService.findAll();
    response.send(Tags);
  }

  async find(request: Request, response: Response) {
    const Tag = await this.TagService.findOne(request.params.id);
    response.send(Tag);
  }

  async create(request: Request, response: Response) {
    const Tag = await this.TagService.create(request.body);
    response.status(201).send(Tag);
  }

  async update(request: Request, response: Response) {
    const Tag = await this.TagService.update(request.params.id, request.body);
    response.send(Tag);
  }

  async delete(request: Request, response: Response) {
    await this.TagService.delete(request.params.id);
    response.send();
  }
}