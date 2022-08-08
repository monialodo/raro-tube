import { Repository } from "typeorm";
import { CommentReaction } from "../../models/commentReactionEntity";

export type ICommentReactionRepository = Repository<CommentReaction>