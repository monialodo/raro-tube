import Container from "typedi";
import { getCustomRepository } from "typeorm";

import { ClassroomRepository } from "../../repositories/classroomRepository";
import { CommentRepository } from "../../repositories/commentRepository";
import { FavoritesRepository } from "../../repositories/favoritesRepository";
import { FileRepository } from "../../repositories/filesRepository";
import { TagRepository } from "../../repositories/tagsRepository";
import { UserRepository } from "../../repositories/userRepository";
import { VideoRepository } from "../../repositories/videoRepository";
import { UserClassroomRepository } from "../../repositories/userClassroomRepository";
import { commentReactionRepository } from "../../repositories/commentReactionRepository";
import { VideoTagRepository } from "../../repositories/videoTagRepository";

import "../../controllers/AuthenticationController";
import "../../controllers/ClassroomController";
import "../../controllers/CommentController";
import "../../controllers/FavoritesController";
import "../../controllers/FileController";
import "../../controllers/TagController";
import "../../controllers/UserController";
import "../../controllers/VideoController";



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
  Container.set("FileRepository", getCustomRepository(FileRepository));
  Container.set("FavoriteRepository", getCustomRepository(FavoritesRepository));
  Container.set("UserClassroomRepository", getCustomRepository(UserClassroomRepository));
  Container.set("CommentReactionRepository", getCustomRepository(commentReactionRepository));
  Container.set("VideoTagRepository", getCustomRepository(VideoTagRepository))
  
};

export default createDependencyInjector;
