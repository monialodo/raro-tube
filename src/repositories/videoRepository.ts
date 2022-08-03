import { EntityRepository,Repository } from "typeorm";
import { IVideoRepository } from "../@types/repositories/IVideosRepository";
import { Video } from "../models/videoEntity";


@EntityRepository(Video)
export class VideoRepository
extends Repository<Video> implements IVideoRepository {}


