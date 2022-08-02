import { Tag } from "../../models/TagEntity";
import { TagDto } from "../dto/TagsDto";

export interface ITagService {
  create(Tag: TagDto): Promise<Tag>;
  findAll(): Promise<Tag[]>;
  findOne(id: string): Promise<Tag>;
  update(id: string, Tag: TagDto): Promise<Tag>;
  softDelete(id: string): Promise<void>;
}
