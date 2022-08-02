import { Repository } from "typeorm";
import { Comment } from "../../models/commentEntity";



export type ICommentRepository = Repository<Comment>
