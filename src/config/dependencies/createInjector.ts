import { getCustomRepository } from "typeorm";
import Container from "typedi";
import { StudentRepository } from "../../repositories/studentsRepository";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/StudentController"


// inicializa services
import "../../services/StudentService.ts";

const createDependencyInjector = () => {
  Container.set("StudentRepository", getCustomRepository(StudentRepository));
};

export default createDependencyInjector;