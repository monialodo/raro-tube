import { Repository } from "typeorm";

import { VideoTag } from "../../models/videoTagEntity";

export type IVideoTagRepository = Repository<VideoTag>