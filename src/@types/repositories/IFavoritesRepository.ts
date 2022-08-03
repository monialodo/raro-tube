import { Repository } from "typeorm";
import { Favorites } from "../../models/favoritesEntity";

export type IFavoritesRepository = Repository<Favorites>

