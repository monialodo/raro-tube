import { EntityRepository, Repository } from "typeorm";

@EntityRepository(File)
export class FilesRepository extends Repository<File> {}