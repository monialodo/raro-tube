import { Readable } from "typeorm/platform/PlatformTools";
import { File } from "../../models/fileEntity";

export class FileDto extends File {}

export interface UploadFileDto {
  name: string;
  path: string;
  sizeBytes: string;
  format: string;
  type: string;
}
