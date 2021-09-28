import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
    res.send("Rota Teste");
});

export default routes;