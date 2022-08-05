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
    this.createdAt = new Date();
  }
}
