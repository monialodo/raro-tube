import { EntityRepository, Repository } from "typeorm";
import { IFilesRepository } from "../@types/repositories/IFilesRepository";
import { File } from "../models/fileEntity";

@EntityRepository(File)
export class FileRepository extends Repository<File> implements IFilesRepository { }