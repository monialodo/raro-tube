import { Router } from "express";
import Container from "typedi";
const router = Router()
import { AdministratorController } from "../controllers/AdministratorController";



const getController = (): AdministratorController => {
    return Container.get<AdministratorController>('AdministratorController')
}

const createRouter = () => {
    router.get('', (req, res) => getController().index(req, res));
    router.post('', (req, res) => getController().create(req, res));
    router.get('/:id', (req, res) => getController().search(req, res));
    router.put('/:id', (req, res) => getController().update(req, res));
    router.delete('/:id', (req, res) => getController().remove(req, res));

    return router;
};

export default createRouter