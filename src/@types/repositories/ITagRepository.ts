import { Tag } from "../../models/tagEntity";
import { TagDto } from "../dto/TagsDto";

export interface ITagRepository {
  save(Tag: TagDto): Promise<Tag>;
  find(): Promise<Tag[]>;
  findOne(id: string): Promise<Tag>;
  update(id: string, Tag: Tag): Promise<Tag>;
  softDelete(id: string): Promise<void>;
}
