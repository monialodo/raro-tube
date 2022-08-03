import { EntityRepository, Repository } from "typeorm";

import { ITagRepository } from "../@types/repositories/ITagRepository";
import { Tag } from "../models/tagEntity";

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> implements ITagRepository {}
