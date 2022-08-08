import { EntityRepository, Repository } from "typeorm";

import { VideoTag } from "../models/videoTagEntity";
import { IVideoTagRepository } from "../@types/repositories/IVideoTagRepository";

@EntityRepository(VideoTag)
export class VideoTagRepository
extends Repository<VideoTag>
implements IVideoTagRepository {}