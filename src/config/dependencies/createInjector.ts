import Container from "typedi";
import { getCustomRepository } from "typeorm";

import { UserRepository } from "../../repositories/userRepository";

// inicializador de dependências:
// inicializa controllers

import "../../controllers/UserController";

// inicializa services
import "../../services/userService";

const createDependencyInjector = () => {
  Container.set("UserRepository", getCustomRepository(UserRepository));
};

export default createDependencyInjector;
