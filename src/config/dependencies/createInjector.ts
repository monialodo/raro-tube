import Container from "typedi";
import { getCustomRepository } from "typeorm";


import { VideoRepository } from "../../repositories/videoRepository";


// inicializador de dependências:
// inicializa controllers

import "../../controllers/VideoController";

// inicializa services
import "../../services/VideoService";

const createDependencyInjector = () => {

  Container.set(
    "VideoRepository",
    getCustomRepository(VideoRepository)
  );

};

export default createDependencyInjector;
