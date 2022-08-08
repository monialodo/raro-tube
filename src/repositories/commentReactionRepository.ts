import { EntityRepository, Repository } from "typeorm";

import { CommentReaction } from "../models/commentReactionEntity";
import { ICommentReactionRepository } from "../@types/repositories/ICommentReactionRepository";

@EntityRepository(CommentReaction)
export class commentReactionRepository
  extends Repository<CommentReaction>
  implements ICommentReactionRepository {}