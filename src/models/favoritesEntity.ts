import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { User } from "./userEntity";
import { Video } from "./videoEntity";

@Entity("favorites")
export class Favorites {
  @PrimaryColumn({ name: "user_id" })
  userId: string;

  @PrimaryColumn({ name: "video_id" })
  videoId: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @JoinColumn({ name: "video_id" })
  @ManyToOne(() => Video, (video) => video.favorites)
  video: Video;
}
