import { EntityRepository,Repository } from "typeorm";
import { Video } from "../models/videoEntity";


@EntityRepository(Video)
export class VideoRepository
extends Repository<Video> {}