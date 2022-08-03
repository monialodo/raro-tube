import { Inject, Service } from "typedi";

import { TagDto } from "../@types/dto/TagsDto";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { ITagRepository } from "../@types/repositories/ITagRepository";
import { ITagService } from "../@types/services/ITagService";
import { Tag } from "../models/tagEntity";

@Service("TagService")
export class TagsService implements ITagService {
  constructor(@Inject("TagRepository") private tagRepository: ITagRepository) {}

  async create(Tag: Tag): Promise<Tag> {
    return this.tagRepository.save(Tag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async findOne(id: string): Promise<Tag> {
    const Tag = await this.tagRepository.findOne(id);
    if (!Tag) {
      throw new NotFoundError("Tag not found");
    }
    return Tag;
  }

  async update(id: string, Tag: TagDto): Promise<Tag> {
    return this.tagRepository.save({ id, ...Tag });
  }

  async delete(id: string): Promise<void> {
    const TagDelete = await this.tagRepository.findOne(id);
    if (!TagDelete) {
      throw new NotFoundError("Tag not found");
    }

    await this.tagRepository.softDelete(id);
  }
}
