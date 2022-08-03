import Container from "typedi";
import { getCustomRepository } from "typeorm";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/FavoritesController"

// inicializa services
import "../../services/favoritesService"
import { FavoritesService } from "../../services/favoritesService";

const createDependencyInjector = () => {
  Container.set("FavoritesService", getCustomRepository(FavoritesService));
};

export default createDependencyInjector;
