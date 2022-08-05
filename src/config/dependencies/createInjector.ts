import Container from "typedi";
import { getCustomRepository } from "typeorm";

import { ClassroomRepository } from "../../repositories/classroomRepository";
import { CommentRepository } from "../../repositories/commentRepository";
import { FavoritesRepository } from "../../repositories/favoritesRepository";
import { FileRepository } from "../../repositories/filesRepository";
import { TagRepository } from "../../repositories/tagsRepository";
import { UserRepository } from "../../repositories/userRepository";
import { VideoRepository } from "../../repositories/videoRepository";



// inicializador de dependências:
// inicializa controllers

import "../../controllers/AuthenticationController";
import "../../controllers/ClassroomController";
import "../../controllers/CommentController";
import "../../controllers/FavoritesController";
import "../../controllers/FileController";
import "../../controllers/TagController";
import "../../controllers/UserController";
import "../../controllers/VideoController";



// inicializa services
import "../../services/AuthenticationService";
import "../../services/ClassroomService";
import "../../services/CommentService";
import "../../services/favoritesService";
import "../../services/FileService";
import "../../services/TagService";
import "../../services/UserService";
import "../../services/VideoService";




const createDependencyInjector = () => {
  Container.set("UserRepository", getCustomRepository(UserRepository));
  Container.set(
    "ClassroomRepository",
    getCustomRepository(ClassroomRepository)
  );
  Container.set(
    "VideoRepository",
    getCustomRepository(VideoRepository)
  );
  Container.set("CommentRepository", getCustomRepository(CommentRepository));
  Container.set("TagRepository", getCustomRepository(TagRepository));
  Container.set("FilesRepository", getCustomRepository(FileRepository));
  Container.set("FavoriteRepository", getCustomRepository(FavoritesRepository));
};

export default createDependencyInjector;
