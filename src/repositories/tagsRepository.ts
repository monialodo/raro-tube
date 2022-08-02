import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../models/tagEntity";

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {}
