import { Router } from "express";
import productsController from "../controller/productsController";
import { categoriesRouter, categoryRouter } from "./categories";
import catogoriesController from "../controller/catogoriesController";

const router: Router = Router();

//na API tem /products/categories e /products/category/jewelery, 2 != por isso esses 2
//como caregoria eh dentro de produto, foi feito assim:
router.use("/categories", categoriesRouter); //
router.use("/category", categoryRouter);

router.get("/", productsController.index);
router.get("/:id", productsController.show);
router.post("/", productsController.insert);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.remove);

export { router };
