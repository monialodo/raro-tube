import { plainToInstance } from "class-transformer";
import { Inject, Service } from "typedi";

import { CommentDTO } from "../@types/dto/CommentDto";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { ICommentRepository } from "../@types/repositories/ICommentRepository";
import { ICommentService } from "../@types/services/ICommentService";
import { Comment } from "../models/commentEntity";

@Service("CommentService")
export class CommentService implements ICommentService {
  constructor(
    @Inject("CommentRepository")
    private commentRepository: ICommentRepository
  ) {}

  async create(comment: CommentDTO): Promise<Comment> {

    const commentInstance = plainToInstance(Comment, {
      ...comment
    })

    return this.commentRepository.save(commentInstance);
  }
  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }
  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }
    return comment;
  }

  async patchUpVote(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne(id);
    if(comment.upvoteQuantity === 1) {
      comment.upvoteQuantity -= 1;
    }
    comment.upvoteQuantity += 1;
    return this.commentRepository.save(comment);
  }

  async patchDownVote(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne(id);
    if(comment.downvoteQuantity === 1) {
      comment.downvoteQuantity -= 1;
    }
    comment.downvoteQuantity += 1;
    return this.commentRepository.save(comment);
  }

  async update(id: string, comment: Comment): Promise<Comment> {
    return this.commentRepository.save({ id, ...comment });
  }
  async delete(id: string): Promise<void> {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    await this.commentRepository.softDelete(id);
  }
}
