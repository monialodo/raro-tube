import { Comment } from "../../models/commentEntity";
import { CommentDTO } from "../dto/CommentDto";

export interface ICommentService {
  create(comment: CommentDTO): Promise<Comment>;
  findAll(): Promise<Comment[]>;
  findOne(id: string): Promise<Comment>;
  update(id: string, comment: CommentDTO): Promise<Comment>;
  delete(id: string): Promise<void>;
}
