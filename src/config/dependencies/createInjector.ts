import Container from "typedi";
import { getCustomRepository } from "typeorm";

import { AdministratorRepository } from "../../repositories/administratorRepository";
import { StudentRepository } from "../../repositories/studentsRepository";
import { SuperUserRepository } from "../../repositories/superUserRepository";
import { TeacherRepository } from "../../repositories/teachersRepository";
import { CommentRepository } from "../../repositories/commentRepository";



// inicializador de dependências:
// inicializa controllers
import "../../controllers/AdministratorController";
import "../../controllers/StudentController";
import "../../controllers/SuperUserController";
import "../../controllers/TeacherController";
import "../../controllers/CommentController"


// inicializa services
import "../../services/AdministratorService";
import "../../services/StudentService";
import "../../services/SuperUserService";
import "../../services/TeacherService";
import "../../services/CommentService"

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
    Container.set("CommentRepository", getCustomRepository(CommentRepository))

};

export default createDependencyInjector;
