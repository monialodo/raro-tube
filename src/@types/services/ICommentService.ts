import { Comment } from "../../models/commentEntity";
import { CommentDTO, CommentVideoDTO } from "../dto/CommentDto";

export interface ICommentService {
  create(commenDto: CommentDTO): Promise<Comment>;
  findAll(): Promise<Comment[]>;
  findOne(id: string): Promise<Comment>;
  update(id: string, commenDto: CommentDTO): Promise<Comment>;
  patchUpVote(id: string): Promise<Comment>;
  patchDownVote(id: string): Promise<Comment>;
  delete(id: string): Promise<void>;
  
}
