import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Classroom } from "./classroomEntity";
import { Comment } from "./commentEntity";
import { Favorites } from "./favoritesEntity";
import { File } from "./fileEntity";
import { User } from "./userEntity";
import { VideoTag } from "./videoTagEntity";

@Entity("videos")
export class Video {
  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "title" })
  title: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: "duration" })
  duration: string;

  @IsString()
  @IsOptional()
  @Column({ name: "description" })
  description?: string;

  @IsOptional()
  @OneToOne(() => File)
  @JoinColumn({ name: "thumbnail_file_id" })
  thumbnail?: File;

  @OneToOne(() => File)
  @JoinColumn({ name: "video_file_id" })
  video: File;

  @OneToOne(() => User)
  @JoinColumn({ name: "teacher_id" })
  teacher: User;

  @OneToMany(() => VideoTag, (videoTag) => videoTag.video)
  videoTags: VideoTag[];

  @ManyToOne(() => Classroom, (classroom) => classroom.videos)
  classroom: Classroom;

  @OneToMany(() => Comment, (comment) => comment.video)
  comments: Comment[];

  @OneToMany(() => Favorites, (favorites) => favorites.video)
  favorites: Favorites[];

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
    if (!this.id && !this.updatedAt) {
      this.id = uuidV4();
      this.updatedAt = new Date();
    }
    this.updatedAt = new Date();
  }
}
