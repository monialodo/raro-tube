import { DeleteResult, UpdateResult } from "typeorm";
import { Video } from "../../models/videoEntity";
import { VideoDTO } from "../dto/VideosDto";

export interface IVideoRepository {

  save(video: VideoDTO): Promise<Video>;
  find(): Promise<Video[]>;
  findOne(id: string): Promise<Video>;
  update(id: string, video: Video): Promise<Video>;
  softDelete(id: string): Promise<void>;
  
}