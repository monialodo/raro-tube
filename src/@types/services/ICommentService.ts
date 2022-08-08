import { Comment } from "../../models/commentEntity";
import { CommentDTO, CommentReactionDTO, CommentVideoDTO } from "../dto/CommentDto";

export interface ICommentService {
  create(commenDto: CommentDTO): Promise<Comment>;
  findAll(): Promise<Comment[]>;
  findOne(id: string): Promise<Comment>;
  update(id: string, commenDto: CommentDTO): Promise<Comment>;
  findUserComment(userId: string): Promise<Comment>;
  delete(id: string): Promise<void>;
  patchVote(commentDto: CommentReactionDTO):Promise<Comment>;
  
}
