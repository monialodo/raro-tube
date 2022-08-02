import Container from "typedi";
import { getCustomRepository } from "typeorm";

import { ClassroomRepository } from "../../repositories/classroomRepository";
import { UserRepository } from "../../repositories/userRepository";

// inicializador de dependências:
// inicializa controllers

import "../../controllers/UserController";

// inicializa services
import "../../services/ClassroomService";
import "../../services/userService";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/ClassroomController";

const createDependencyInjector = () => {
  Container.set("UserRepository", getCustomRepository(UserRepository));

  Container.set(
    "ClassroomRepository",
    getCustomRepository(ClassroomRepository)
  );
};
export default createDependencyInjector;
