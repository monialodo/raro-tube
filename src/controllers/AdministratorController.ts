import { IAdministratorService } from "../@types/services/IAdministratorService";
import { Inject, Service } from "typedi";
import { Request, Response } from "express";

@Service('AdministratorController')
export class AdministratorController {
    constructor(@Inject('AdministratorService')
    private readonly admnistratorService: IAdministratorService) { }

    async index(request: Request, response: Response) {
        
        const adms = await this.admnistratorService.findAll();

        response.send(adms)
    }

    async search(request: Request, response: Response) {
        const adm = await this.admnistratorService.findOne(request.params.id)

        response.send(adm)
    }
    async create(request: Request, response: Response) {
        const adm = await this.admnistratorService.create(request.body)
        response.status(201).send(adm)
    }
    async update(request: Request, response: Response) {
        const adm = await this.admnistratorService.update(
            request.params.id,
            request.body
            )
        response.send(adm)
    }

    async remove(request: Request, response: Response) {
        await this.admnistratorService.delete(request.params.id)
        response.send()

    }

}