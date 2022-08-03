import { Repository } from "typeorm";
import { File } from "../../models/fileEntity";

export type IFilesRepository = Repository<File>;