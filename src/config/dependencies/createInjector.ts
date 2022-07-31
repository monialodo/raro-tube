import { getCustomRepository } from "typeorm";
import Container from "typedi";
import { StudentRepository } from "../../repositories/studentsRepository";
import { TeacherRepository } from "../../repositories/teachersRepository";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/StudentController"
import "../../controllers/TeacherController"

// inicializa services
import "../../services/TeacherService.ts";

const createDependencyInjector = () => {
  Container.set("StudentRepository", getCustomRepository(StudentRepository));
  Container.set("TeacherRepository", getCustomRepository(TeacherRepository));
};

export default createDependencyInjector;