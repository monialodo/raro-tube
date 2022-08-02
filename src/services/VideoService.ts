import { Inject,Service } from "typedi";
import { VideoDTO } from "../@types/dto/VideosDto";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { IVideosService } from "../@types/services/IVideosService";
import { Video } from "../models/videoEntity";
import { IVideoRepository } from "../@types/repositories/IVideosRepository";



@Service("VideoService")
export class VideosService implements IVideosService {
    
    constructor(@Inject("VideoRepository")
        private VideoRepository: IVideoRepository){}
    
    async create(video: VideoDTO): Promise<Video> {
       return this.VideoRepository.save(video)
    }
    async findAll(): Promise<Video[]> {
       return this.VideoRepository.find()
    }
    async findOne(id: string): Promise<Video> {
        const video = await this.VideoRepository.findOne(id)
        if(!video){
            throw new NotFoundError("Video not found")
        }
        return video
    }
    async update(id: string, video: VideoDTO): Promise<Video> {
       return this.VideoRepository.save({id, ...video})
    }
    async delete(id: string): Promise<void> {
        const video = await this.VideoRepository.findOne(id)
        if(!video){
            throw new NotFoundError("Video not found")
        }

        await this.VideoRepository.softDelete(id)


    }

    



}