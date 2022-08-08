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

  async patchVote(request: Request, response: Response){
    const id = request.params.id
    const reaction = request.body.vote
    //Mock
    const userId = 'dcfba9a4-e555-443f-bc86-23e972b9c3e7'

    const Comment = await this.commentService.patchVote({id,reaction,userId})
    response.send(Comment)
  }

  async findUserComment(request: Request, response: Response) {
    const Comment = await this.commentService.findUserComment(request.params.id);
    response.send(Comment);
  }

  async isItMineComment(request: Request, response: Response) {
    const Comment = await this.commentService.isItMineComment(
      request.params.id,
      request.params.userId
    );
    response.send(Comment);
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
