import * as express from 'express';


const createRouters = (app: express.Express) => {
    const router = express.Router();
    router.get('/', (req, res) => {
        res.send('Hello World!');
    });
    app.use('/', router);

}



export default createRouters;