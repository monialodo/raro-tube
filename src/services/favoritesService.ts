import { Inject, Service } from "typedi";

import { NotFoundError } from "../@types/errors/NotFoundError";
import { IFavoritesRepository } from "../@types/repositories/IFavoritesRepository";
import { IFavoritesService } from "../@types/services/IFavoritesService";
import { Favorites } from "../models/favoritesEntity";



@Service("FavoritesService")
export class FavoritesService implements IFavoritesService {
  constructor(
    @Inject("FavoritesRepository")
    private favoritesRepository: IFavoritesRepository
  ) { }

  async create(favorite: Favorites): Promise<Favorites> {
    return this.favoritesRepository.save(favorite);
  }

  async findAll(): Promise<Favorites[]> {
    return this.favoritesRepository.find();
  }

  async findOne(id: string): Promise<Favorites> {
    const favorite = await this.favoritesRepository.findOne(id);
    if (!favorite) {
      throw new NotFoundError("favorite not found");
    }
    return favorite;
  }

  async update(id: string, favorite: Favorites): Promise<Favorites> {
    return this.favoritesRepository.save({ id, ...favorite });
  }

  async delete(id: string): Promise<void> {
    const user = await this.favoritesRepository.findOne(id);
    if (!user) {
      throw new NotFoundError("Favorites not found");
    }
    await this.favoritesRepository.softDelete(id);
  }
}
