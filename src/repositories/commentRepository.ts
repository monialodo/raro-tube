import { EntityRepository, Repository } from "typeorm";

import { ICommentRepository } from "../@types/repositories/ICommentRepository";
import { Comment } from "../models/commentEntity";

@EntityRepository(Comment)
export class CommentRepository
  extends Repository<Comment>
  implements ICommentRepository {}
