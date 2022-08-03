import Container from "typedi";
import { getCustomRepository } from "typeorm";

import { FilesRepository } from "../../repositories/filesRepository";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/FileController";

// inicializa services
import "../../services/FileService";

const createDependencyInjector = () => {

  Container.set("FilesRepository", getCustomRepository(FilesRepository));
};

export default createDependencyInjector;
