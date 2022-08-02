import { Inject, Service } from "typedi";

import { TagDto } from "../@types/dto/TagsDto";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { ITagRepository } from "../@types/repositories/ITagRepository";
import { ITagService } from "../@types/services/ITagService";
import { Tag } from "../models/tagEntity";

@Service("TagService")
export class TagsService implements ITagService {
  constructor(@Inject("TagRepository") private TagRepository: ITagRepository) {}

  async create(Tag: Tag): Promise<Tag> {
    return this.TagRepository.save(Tag);
  }

  async findAll(): Promise<Tag[]> {
    return this.TagRepository.find();
  }

  async findOne(id: string): Promise<Tag> {
    const Tag = await this.TagRepository.findOne(id);
    if (!Tag) {
      throw new NotFoundError("Tag not found");
    }
    return Tag;
  }

  async update(id: string, Tag: TagDto): Promise<Tag> {
    return this.TagRepository.save({ id, ...Tag });
  }

  async delete(id: string): Promise<void> {
    const TagDelete = await this.TagRepository.findOne(id);
    if (!TagDelete) {
      throw new NotFoundError("Tag not found");
    }

    await this.TagRepository.delete(id);
  }
}