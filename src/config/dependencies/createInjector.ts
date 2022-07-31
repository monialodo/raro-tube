import Container from "typedi";
import { getCustomRepository } from "typeorm";

import { StudentRepository } from "../../repositories/studentsRepository";
import { SuperUserRepository } from "../../repositories/superUserRepository";
import { TeacherRepository } from "../../repositories/teachersRepository";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/StudentController";
import "../../controllers/SuperUserController";
import "../../controllers/TeacherController";

// inicializa services
import "../../services/StudentService";
import "../../services/SuperUserService";
import "../../services/TeacherService";

const createDependencyInjector = () => {
  Container.set("StudentRepository", getCustomRepository(StudentRepository));
  Container.set(
    "SuperUserRepository",
    getCustomRepository(SuperUserRepository)
  );
  Container.set("TeacherRepository", getCustomRepository(TeacherRepository));
};

export default createDependencyInjector;
