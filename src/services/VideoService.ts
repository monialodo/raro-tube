import { Inject,Service } from "typedi";
import {  videosRequestDTO } from "../@types/dto/VideosDto";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { IVideosService } from "../@types/services/IVideosService";
import { Video } from "../models/videoEntity";
import { IVideoRepository } from "../@types/repositories/IVideosRepository";
import { plainToInstance } from "class-transformer";
import { IFileService } from "../@types/services/IFileService";
import { IUserService } from "../@types/services/IUserService";
import { IClassroomService } from "../@types/services/IClassroomService";
import { ICommentService } from "../@types/services/ICommentService";
import { Comment } from "../models/commentEntity";
import { CommentVideoDTO } from "../@types/dto/CommentDto";
import { fileToInstance } from "../helpers/fileToInstance";



@Service("VideoService")
export class VideosService implements IVideosService {
    
    constructor(@Inject("VideoRepository")
        private videoRepository: IVideoRepository,
        @Inject("FileService")
        private readonly filesService:IFileService,
        @Inject("UserService")
        private readonly usersService:IUserService,
        @Inject("ClassroomService")
        private readonly classroomService: IClassroomService,
        @Inject("CommentService")
        private readonly commentService: ICommentService
        ){}
    
    async upload(videoData : videosRequestDTO):Promise<Video>{
        
        const {title,description,duration } = videoData.body
        const classroomId = videoData.body.classroomId || null
        const video = videoData.files.video[0]
        const thumbnail = videoData.files.thumbnail[0]   

        const teacher = await this.usersService.findOne(videoData.body.teacherId)  

        if(!teacher){
          throw new NotFoundError("Teacher not found")
        }

        const videoFile = await this.filesService.upload(
            fileToInstance(video, 'video')
        )
        
        const thumbFile = await this.filesService.upload(
            fileToInstance(thumbnail,'thumbnail')  
        )

        let classroom = null     
        if(classroomId){
          classroom = await this.classroomService.findOne(classroomId)
        }
        
        const videoInstance = plainToInstance(Video, {
            title,
            description,
            duration,
            teacher,            
            classroom,
            video:videoFile,
            thumbnail:thumbFile
        })      
          
        return  this.videoRepository.save(videoInstance)        

    }

    
    async findAll(): Promise<Video[]> {
       return this.videoRepository.find({
        relations:['classroom']
       })
    }
    async findOne(id: string): Promise<Video> {
        const video = await this.videoRepository.findOne(id, {relations:['comments']})
        if(!video){
            throw new NotFoundError("Video not found")
        }
        return video
    }
    async update(id: string, video: Video): Promise<Video> {
        const foundVideo = await this.videoRepository.findOne(id);
        if (!foundVideo) {
          throw new NotFoundError("Video not found");
        }
        return this.videoRepository.save({id,...video});
    }
    async delete(id: string): Promise<void> {
        const video = await this.videoRepository.findOne(id)
        if(!video){
            throw new NotFoundError("Video not found")
        }

        await this.videoRepository.softDelete(id)
    }

    async findComments(id:string):Promise<Video>{
                
        const video = await this.videoRepository.findOne({
            where:{id:id},
            relations:['comments']
        })

        if(!video){
          throw new NotFoundError
        }
        return video
    }

    async sendComment(comment: CommentVideoDTO):Promise<Comment>{
        const {content, userId,videoId}= comment

        const video = await this.videoRepository.findOne(videoId)
        
        //Mock
        const user = await this.usersService.findOne('dcfba9a4-e555-443f-bc86-23e972b9c3e7')
        

        if(!video || !user){
            throw new NotFoundError
        }
        
        const commentVideo = await this.commentService.create({
            content,video,user
        })
        console.log("passou =====>");

        return commentVideo
    }



}