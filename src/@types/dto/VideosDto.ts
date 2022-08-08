
import { Video } from "../../models/videoEntity";
import { Request } from "express";
import { VideoTag } from "../../models/videoTagEntity";

export class VideoDTO extends Video{}
export class VideoUploadDTO{
  title:string
  description:string
  duration:string
  teacher_id:string
  classroom_id?: string
}

export class videoTagsDto extends VideoTag{}

export interface videosRequestDTO extends Request{
    files : {
      video: Express.Multer.File[]
      thumbnail: Express.Multer.File[]
    }
    body: {
        title : string 
        description : string
        duration :string
        teacherId: string
        classroomId?: string
        tags:string[]
    }
  }