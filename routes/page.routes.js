import express from "express"

import { Allpages, getUserById, updatePage } from "../controllers/page.controller.js";
import { addPage } from "../controllers/page.controller.js";
import { getById } from "../controllers/page.controller.js";
import { deletePage } from "../controllers/page.controller.js";



const pageRouter =  express.Router();



pageRouter.get("/",Allpages);
pageRouter.post("/add",addPage);
pageRouter.put("/update/:id",updatePage)
pageRouter.get("/:id",getById)
pageRouter.delete("/:id",deletePage)
pageRouter.get("/user/:id",getUserById)



export default pageRouter;

