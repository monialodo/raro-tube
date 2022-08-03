import { Favorites } from "../../models/favoritesEntity";
import { FavoritesDto } from "../dto/FavoritesDto";

export interface IFavoritesService {
  create(userDTO: FavoritesDto): Promise<Favorites>;
  findAll(): Promise<Favorites[]>;
  findOne(id: string): Promise<Favorites>;
  update(id: string, userDTO: FavoritesDto): Promise<Favorites>;
  delete(id: string): Promise<void>;
}
