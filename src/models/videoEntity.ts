import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Classroom } from "./classroomEntity";
import { Comment } from "./commentEntity";
import { Favorites } from "./favoritesEntity";
import { File } from "./fileEntity";
import { Tag } from "./tagsEntity";
import { User } from "./userEntity";
import { videoTags } from "./videoTags";

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
  @IsNotEmpty()
  @Column({ name: "description" })
  description: string;

  @JoinColumn({ name: "thumbnail_file_id" })
  @OneToOne(() => File)
  thumbnail: File;

  @JoinColumn({ name: "video_file_id" })
  @OneToOne(() => File)
  video: File;

  @OneToMany(() => videoTags, (videoTags) => videoTags.video)
  videoTags: Tag[];

  @ManyToOne(() => Classroom, (classroom) => classroom.videos)
  classroom: Classroom;

  @JoinColumn({ name: "teacher_id" })
  @OneToOne(() => User)
  teacher: User;

  @OneToMany(() => Comment, (comment) => comment.video)
  comments: Comment[];

  @OneToMany(() => Favorites, (favorites) => favorites.video)
  favorites: Favorites[];

  @IsDate()
  @IsNotEmpty()
  @Column({ name: "created_at" })
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
