import Container from "typedi";
import { getCustomRepository } from "typeorm";

import { AdministratorRepository } from "../../repositories/administratorRepository";
import { StudentRepository } from "../../repositories/studentsRepository";
import { SuperUserRepository } from "../../repositories/superUserRepository";
import { TeacherRepository } from "../../repositories/teachersRepository";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/AdministratorController";
import "../../controllers/StudentController";
import "../../controllers/SuperUserController";
import "../../controllers/TeacherController";

// inicializa services
import "../../services/AdministratorService";
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
  Container.set(
    "AdministratorRepository",
    getCustomRepository(AdministratorRepository)
  );
};

export default createDependencyInjector;
