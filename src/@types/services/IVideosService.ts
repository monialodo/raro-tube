import { Classroom } from "../../models/classroomEntity";
import { User } from "../../models/userEntity";
import { Video } from "../../models/videoEntity";
import { FileDto } from "../dto/FileDto";
import { VideoDTO, VideoUploadDTO } from "../dto/VideosDto";

export interface IVideosService{
    create(videoDto: VideoUploadDTO,files:FileDto[],teacher:User, classroom:Classroom): Promise<Video>;
    findAll(): Promise<Video[]>;
    findOne(id: string): Promise<Video>;
    update(id: string, videoDto: VideoDTO): Promise<Video>;
    delete(id: string): Promise<void>;  
}