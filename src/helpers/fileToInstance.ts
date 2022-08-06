import { plainToInstance } from "class-transformer"
import { FileDto } from "../@types/dto/FileDto"

export const fileToInstance = (file:Express.Multer.File, type:string):FileDto => {

    return plainToInstance(FileDto,{
      name: file.originalname,
      path: file.path,
      format: file.mimetype,
      sizeBytes: file.size,
      type: type
    })

   

  }

