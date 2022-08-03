import { Repository } from "typeorm";

import { Tag } from "../../models/tagEntity";

export type ITagRepository = Repository<Tag>;
