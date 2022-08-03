import { EntityRepository, Repository } from "typeorm";
import { IFavoritesRepository } from "../@types/repositories/IFavoritesRepository";
import { Favorites } from "../models/favoritesEntity";



@EntityRepository(Favorites)
export class FavoritesRepository 
extends Repository<Favorites> 
implements IFavoritesRepository{}
