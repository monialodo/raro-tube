import { Video } from "../../models/videoEntity";
import { VideoDTO } from "../dto/VideosDto";

export interface IVideosService{
    create(video: VideoDTO): Promise<Video>;
    findAll(): Promise<Video[]>;
    findOne(id: string): Promise<Video>;
    update(id: string, video: VideoDTO): Promise<Video>;
    delete(id: string): Promise<void>;  
}