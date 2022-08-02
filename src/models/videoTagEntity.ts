import { IsDate, IsNotEmpty, IsOptional } from "class-validator";
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Tag } from "./tagEntity";
import { Video } from "./videoEntity";

@Entity("video_tags")
export class VideoTag {
  @PrimaryColumn({ name: "video_id" })
  videoId: string;

  @PrimaryColumn({ name: "tag_id" })
  tagId: string;

  @ManyToOne(() => Video, (video) => video.videoTags)
  @JoinColumn({ name: "video_id" })
  video: Video;

  @ManyToOne(() => Tag, (tag) => tag.videoTags)
  @JoinColumn({ name: "tag_id" })
  tag: Tag;

  @IsDate()
  @IsNotEmpty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @IsDate()
  @IsOptional()
  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;

  constructor() {
    if (!this.updatedAt) {
      this.updatedAt = new Date();
    }
    this.updatedAt = new Date();
  }
}
