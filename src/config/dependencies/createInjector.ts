import Container from "typedi";
import { getCustomRepository } from "typeorm";

import { ClassroomRepository } from "../../repositories/classroomRepository";
import { CommentRepository } from "../../repositories/commentRepository";
import { TagRepository } from "../../repositories/tagsRepository";
import { UserRepository } from "../../repositories/userRepository";

// inicializador de dependências:
// inicializa controllers

import "../../controllers/ClassroomController";
import "../../controllers/CommentController";
import "../../controllers/TagController";
import "../../controllers/UserController";

// inicializa services
import "../../services/ClassroomService";
import "../../services/CommentService";
import "../../services/TagService";
import "../../services/userService";

const createDependencyInjector = () => {
  Container.set("UserRepository", getCustomRepository(UserRepository));

  Container.set(
    "ClassroomRepository",
    getCustomRepository(ClassroomRepository)
  );

  Container.set("CommentRepository", getCustomRepository(CommentRepository));

  Container.set("TagRepository", getCustomRepository(TagRepository));
};
export default createDependencyInjector;
