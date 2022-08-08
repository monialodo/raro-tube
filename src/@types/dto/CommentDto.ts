import { User } from "../../models/userEntity";
import { Video } from "../../models/videoEntity";
import { Reaction } from "../helpers/EnumReaction";

export class CommentDTO {
    content: string;
    video: Video;
    user: User
}

export class CommentReactionDTO{
    id:string
    userId:string
    reaction: Reaction
}

export class CommentVideoDTO {
    content: string;
    videoId: string;
    userId: string
}