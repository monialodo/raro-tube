import { Request, Response } from "express";
import { Inject, Service } from "typedi";

import { IVideosService } from "../@types/services/IVideosService";

@Service("VideoController")
export class VideoController {
  constructor(
    @Inject("VideoService")
    private readonly videosService: IVideosService
  ) {}

  async findAll(request: Request, response: Response) {
    const Videos = await this.videosService.findAll();
    response.send(Videos);
  }

  async find(request: Request, response: Response) {
    const Video = await this.videosService.findOne(request.params.id);
    response.send(Video);
  }

  async create(request: Request, response: Response) {
    const Video = await this.videosService.create(request.body);
    response.status(201).send(Video);
  }

  async update(request: Request, response: Response) {
    const Video = await this.videosService.update(request.params.id, request.body);
    response.send(Video);
  }

  async delete(request: Request, response: Response) {
    await this.videosService.delete(request.params.id);
    response.send();
  }



}