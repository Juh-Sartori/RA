import { Router } from "express";
import categoriesController from "../controller/catogoriesController";

const categoriesRouter: Router = Router();
const categoryRouter: Router = Router(); //teve q fazer essa rota, opis eh como se esse category fosse algo generico, pq na busca eh especificado

categoriesRouter.get("/", categoriesController.index);
categoryRouter.get("/:nameRouter", categoriesController.show); //como aq procura por nome,ai faz assim (namaeRouter, eu quem escolhi o nome, so para fazr a ligacao com o categoryController)
categoriesRouter.post("/", categoriesController.insert);
categoriesRouter.put("/:name", categoriesController.update);
categoriesRouter.delete("/:name", categoriesController.remove);

export { categoriesRouter, categoryRouter };
