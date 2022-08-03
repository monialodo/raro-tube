import { Video } from "../../models/videoEntity";
import { VideoDTO } from "../dto/VideosDto";

export interface IVideosService{
    create(videoDto: VideoDTO): Promise<Video>;
    findAll(): Promise<Video[]>;
    findOne(id: string): Promise<Video>;
    update(id: string, videoDto: VideoDTO): Promise<Video>;
    delete(id: string): Promise<void>;  
}