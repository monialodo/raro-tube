import { getCustomRepository } from "typeorm";
import Container from "typedi";
import { StudentRepository } from "../../repositories/studentsRepository";
import { AdministratorRepository } from "../../repositories/AdministratorRepository";
// inicializador de dependências:
// inicializa controllers
import "../../controllers/StudentController"
import "../../controllers/AdministratorController"

// inicializa services
import "../../services/StudentService.ts";
import "../../services/AdministratorService.ts"

const createDependencyInjector = () => {
  Container.set("StudentRepository", getCustomRepository(StudentRepository))
  Container.set("AdministratorRepository", getCustomRepository(AdministratorRepository))
};

export default createDependencyInjector;