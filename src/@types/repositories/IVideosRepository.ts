import { Repository } from "typeorm";
import { Video } from "../../models/videoEntity";

export type IVideoRepository = Repository<Video> 