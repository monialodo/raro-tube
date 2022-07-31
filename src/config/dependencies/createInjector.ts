import Container from "typedi";
import { getCustomRepository } from "typeorm";

import { StudentRepository } from "../../repositories/studentsRepository";
import { SuperUserRepository } from "../../repositories/superUserRepository";

import "../../controllers/StudentController";
import "../../controllers/SuperUserController";

import "../../services/StudentService";
import "../../services/SuperUserService";

const createDependencyInjector = () => {
  Container.set("StudentRepository", getCustomRepository(StudentRepository));
  Container.set(
    "SuperUserRepository",
    getCustomRepository(SuperUserRepository)
  );
};

export default createDependencyInjector;
