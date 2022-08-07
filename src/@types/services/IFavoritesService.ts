import { Favorites } from "../../models/favoritesEntity";
import { FavoritesDto } from "../dto/FavoritesDto";

export interface IFavoritesService {
  create(favoriteDto: FavoritesDto): Promise<Favorites>;
  findAll(): Promise<Favorites[]>;
  findOne(id: string): Promise<Favorites>;
  update(id: string, favoriteDto: FavoritesDto): Promise<Favorites>;
  favAndUnfav(userId: string, videoId: string): Promise<Favorites>;
  delete(id: string): Promise<void>;
}
