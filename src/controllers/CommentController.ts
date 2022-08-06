import { Request, Response } from "express";
import { Inject, Service } from "typedi";

import { ICommentService } from "../@types/services/ICommentService";

@Service("CommentController")
export class CommentController {
  constructor(
    @Inject("CommentService")
    private readonly commentService: ICommentService
  ) {}

  async findAll(request: Request, response: Response) {
    const Comments = await this.commentService.findAll();
    response.send(Comments);
  }

  async find(request: Request, response: Response) {
    const Comment = await this.commentService.findOne(request.params.id);
    response.send(Comment);
  }

  async create(request: Request, response: Response) {
    const Comment = await this.commentService.create(request.body);
    response.status(201).send(Comment);
  }

  async update(request: Request, response: Response) {
    const Comment = await this.commentService.update(
      request.params.id,
      request.body
    );
    response.send(Comment);
  }

  async delete(request: Request, response: Response) {
    await this.commentService.delete(request.params.id);
    response.send();
  }

}
