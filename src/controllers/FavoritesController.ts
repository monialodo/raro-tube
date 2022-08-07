import { Request, Response } from "express";
import { Inject, Service } from "typedi";

import { IFavoritesService } from "../@types/services/IFavoritesService";

@Service("FavoritesController")
export class FavoritesController {
  constructor(
    @Inject("FavoritesService")
    private readonly favoriteService: IFavoritesService
  ) {}

  async findAll(request: Request, response: Response) {
    const favorites = await this.favoriteService.findAll();
    response.send(favorites);
  }

  async find(request: Request, response: Response) {
    const favorite = await this.favoriteService.findOne(request.params.id);
    response.send(favorite);
  }

  async create(request: Request, response: Response) {
    const favorite = await this.favoriteService.create(request.body);
    response.status(201).send(favorite);
  }

  async favAndUnfav(request: Request, response: Response) {
    const favorite = await this.favoriteService.favAndUnfav(
      request.params.userId, request.params.videoId
    );
    response.send(favorite);
  }

  async update(request: Request, response: Response) {
    const favorite = await this.favoriteService.update(
      request.params.id,
      request.body
    );
    response.send(favorite);
  }

  async delete(request: Request, response: Response) {
    await this.favoriteService.delete(request.params.id);
    response.send();
  }
}
