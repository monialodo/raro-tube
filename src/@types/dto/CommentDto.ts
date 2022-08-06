import { Comment } from "../../models/commentEntity";
import { User } from "../../models/userEntity";
import { Video } from "../../models/videoEntity";

export class CommentDTO extends Comment {}

export class CommentVideoDTO {
    content: string;
    video: Video;
    user: User
}