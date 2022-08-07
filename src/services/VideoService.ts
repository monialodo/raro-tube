import { Inject,Service } from "typedi";
import { VideoDTO, VideoUploadDTO } from "../@types/dto/VideosDto";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { IVideosService } from "../@types/services/IVideosService";
import { Video } from "../models/videoEntity";
import { IVideoRepository } from "../@types/repositories/IVideosRepository";
import { FileDto } from "../@types/dto/FileDto";
import { User } from "../models/userEntity";
import { plainToInstance } from "class-transformer";
import { Classroom } from "../models/classroomEntity";



@Service("VideoService")
export class VideosService implements IVideosService {
    
    constructor(@Inject("VideoRepository")
        private videoRepository: IVideoRepository){}
    
    async create(videoDto: VideoUploadDTO, files:FileDto[],
        teacher:User, classroom:Classroom): Promise<Video> {
    
    const {title,description,duration } = videoDto
    const [thumbnail,video] = files

    const videoInstance = plainToInstance(Video, {
        title,description,duration, thumbnail,
        video, teacher, classroom
            
    })
    
    return this.videoRepository.save(videoInstance)
    
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

    



}