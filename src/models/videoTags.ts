import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Tag } from "./tagsEntity";
import { Video } from "./videoEntity";

@Entity("video_tags")
export class videoTags {
  @PrimaryColumn({ name: "video_id" })
  videoId: string;

  @PrimaryColumn({ name: "tag_id" })
  tagId: string;

  @JoinColumn({ name: "video_id" })
  @ManyToOne(() => Video, (video) => video.videoTags)
  video: Video;

  @JoinColumn({ name: "tag_id" })
  @ManyToOne(() => Tag, (tag) => tag.videosTags)
  tag: Tag;
}
