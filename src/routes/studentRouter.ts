import { StudentController } from "../controllers/StudentController";
import { Router } from "express";
import Container from "typedi";
const router = Router();

const getController = (): StudentController => {
  return Container.get<StudentController>('StudentController');
};

const createRouter = () => {
  router.get('/',(req, res) => getController().buscarTodos(req, res));
  router.get('/:id', (req, res) => getController().buscar(req, res));
  router.post('/', (req, res) => getController().criar(req, res));
  router.put('/:id', (req, res) => getController().atualizar(req, res));
  router.delete('/:id', (req, res) => getController().deletar(req, res));

  return router;
}

export default createRouter;