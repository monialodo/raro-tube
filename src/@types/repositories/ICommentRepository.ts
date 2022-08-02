
import { DeleteResult, UpdateResult } from "typeorm";
import { Comment } from "../../models/commentEntity";
import { CommentDTO } from "../dto/CommentDto";


export interface ICommentRepository {
  save(Comment: CommentDTO): Promise<Comment>;
  find(): Promise<Comment[]>;
  findOne(id: string): Promise<Comment>;
  update(id: string, comment: Comment): Promise<UpdateResult>;
  delete(id: string): Promise<DeleteResult>;
}
