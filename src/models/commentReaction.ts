import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Comment } from "./commentEntity";
import { User } from "./userEntity";

@Entity("comment_reactions")
export class CommentReaction {
  @PrimaryColumn({ name: "comment_id" })
  commentId: string;

  @PrimaryColumn({ name: "user_id" })
  userId: string;

  @Column({ name: "reaction" })
  reaction: string;

  @JoinColumn({ name: "comment_id" })
  @ManyToOne(() => Comment, (comment) => comment.commentReactions)
  comment: Comment;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.commentReactions)
  user: User;
}
