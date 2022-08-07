import { Comment } from "../../models/commentEntity";
import { User } from "../../models/userEntity";
import { Video } from "../../models/videoEntity";

export class CommentDTO {
    content: string;
    video: Video;
    user: User
}

export class CommentVideoDTO {
    content: string;
    videoId: string;
    userId: string
}