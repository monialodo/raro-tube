import { plainToInstance } from "class-transformer";
import { Inject, Service } from "typedi";

import { CommentDTO, CommentReactionDTO } from "../@types/dto/CommentDto";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { ICommentReactionRepository } from "../@types/repositories/ICommentReactionRepository";
import { ICommentRepository } from "../@types/repositories/ICommentRepository";
import { IUserRepository } from "../@types/repositories/IUserRepository";
import { ICommentService } from "../@types/services/ICommentService";
import { Comment } from "../models/commentEntity";
import { CommentReaction } from "../models/commentReactionEntity";

@Service("CommentService")
export class CommentService implements ICommentService {
  constructor(
    @Inject("UserRepository")
    private userRepository: IUserRepository,
    @Inject("CommentReactionRepository")
    private commentReactionRepository: ICommentReactionRepository,
    @Inject("CommentRepository")
    private commentRepository: ICommentRepository
  ) { }


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

  async findUserComment(userId: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { userId } });
    const user = await this.userRepository.findOne(comment.user);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }
    return plainToInstance(Comment, {
      ...comment,
      user: user
    });
  }


  async patchVote(commentDto: CommentReactionDTO): Promise<Comment> {
    const { id, reaction, userId } = commentDto

    const comment = await this.commentRepository.findOne(id)
    if (!comment) {
      throw new NotFoundError
    }


    let commentReaction = await this.commentReactionRepository.findOne({
      where: { commentId: id, userId: userId }
    })


    const user = await this.userRepository.findOne(userId)

    if (!commentReaction) {
      commentReaction = plainToInstance(CommentReaction, {
        commentId: comment.id,
        comment: comment,
        userId: userId,
        user: user,
        reaction: null
      })
    }


    if (reaction == commentReaction.reaction && reaction == 'up') {
      if (comment.upvoteQuantity != 0) {
        comment.upvoteQuantity -= 1
      }

      commentReaction.reaction = null
      await this.commentReactionRepository.delete({ comment, user })
      return this.commentRepository.save(comment)
    }

    if (reaction == commentReaction.reaction && reaction == 'down') {
      if (comment.downvoteQuantity != 0) {
        comment.downvoteQuantity -= 1
      }
      commentReaction.reaction = null
      await this.commentReactionRepository.delete({ comment, user })
      return this.commentRepository.save(comment)
    }

    if (reaction != commentReaction.reaction && reaction == 'up') {
      if (comment.downvoteQuantity != 0) {
        comment.downvoteQuantity -= 1
      }
      comment.upvoteQuantity += 1
      commentReaction.reaction = 'up'
      await this.commentReactionRepository.save(commentReaction)
      return this.commentRepository.save(comment)
    }

    if (reaction != commentReaction.reaction && reaction == 'down') {
      if (comment.upvoteQuantity != 0) {
        comment.upvoteQuantity -= 1
      }
      comment.downvoteQuantity += 1
      commentReaction.reaction = 'down'
      await this.commentReactionRepository.save(commentReaction)
      return this.commentRepository.save(comment)
    }

    if (commentReaction.reaction == null) {
      if (reaction == 'up') {
        comment.upvoteQuantity += 1
        commentReaction.reaction = 'up'
      }
      if (reaction == 'down') {
        comment.downvoteQuantity += 1
        commentReaction.reaction = 'down'
      }


      await this.commentReactionRepository.save(commentReaction)
      return this.commentRepository.save(comment)
    }



  }

  async isItMineComment(id: string, userId: string): Promise<boolean> {
    const comments = await this.commentRepository.find({ where: { userId } });
    if (!comments) {
      return false;
    }
    return true;
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
