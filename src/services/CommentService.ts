import { Inject,Service } from "typedi";
import { CommentDTO } from "../@types/dto/CommentDto";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { ICommentRepository } from "../@types/repositories/ICommentRepository";
import { ICommentService } from "../@types/services/ICommentService";
import { Comment } from "../models/commentEntity";

@Service("CommentService")
export class CommentService implements ICommentService {
    
    constructor(@Inject("CommentRepository")
        private CommentRepository: ICommentRepository){}
    
    async create(comment: CommentDTO): Promise<Comment> {
       return this.CommentRepository.save(comment)
    }
    async findAll(): Promise<Comment[]> {
       return this.CommentRepository.find()
    }
    async findOne(id: string): Promise<Comment> {
        const comment = await this.CommentRepository.findOne(id)
        if(!comment){
            throw new NotFoundError("Comment not found")
        }
        return comment
    }
    async update(id: string, comment: CommentDTO): Promise<Comment> {
       return this.CommentRepository.save({id, ...comment})
    }
    async delete(id: string): Promise<void> {
        const comment = await this.CommentRepository.findOne(id)
        if(!comment){
            throw new NotFoundError("Comment not found")
        }

        await this.CommentRepository.delete(id)


    }

    



}