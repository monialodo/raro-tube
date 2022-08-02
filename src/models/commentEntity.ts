import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Min
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { CommentReaction } from "./commentReaction";
import { User } from "./userEntity";
import { Video } from "./videoEntity";

@Entity("comments")
export class Comment {
  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsNumber()
  @IsDefined()
  @Min(0)
  @Column({ name: "upvote_quantity" })
  upvoteQuantity: number;

  @IsNumber()
  @IsDefined()
  @Min(0)
  @Column({ name: "downvote_quantity" })
  downvoteQuantity: number;

  @ManyToOne(() => Video, (video) => video.comments)
  video: Video;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @OneToMany(
    () => CommentReaction,
    (commentReactions) => commentReactions.comment
  )
  commentReactions: CommentReaction[];

  @IsDate()
  @IsNotEmpty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
