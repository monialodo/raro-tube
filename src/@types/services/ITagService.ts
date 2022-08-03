import { Tag } from "../../models/tagEntity";
import { TagDto } from "../dto/TagsDto";

export interface ITagService {
  create(tag: TagDto): Promise<Tag>;
  findAll(): Promise<Tag[]>;
  findOne(id: string): Promise<Tag>;
  update(id: string, tag: TagDto): Promise<Tag>;
  delete(id: string): Promise<void>;
}
