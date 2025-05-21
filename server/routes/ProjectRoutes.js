import { Router } from "express";

import { addProject, deleteProject, getAllUserProjects, getProjectById, updateProject } from "../controllers/ProjectController.js";

const projectRouter = Router();

projectRouter.post("/add", addProject);
projectRouter.put("/update", updateProject);
projectRouter.post("/delete", deleteProject);
projectRouter.post("/getbyid", getProjectById);
projectRouter.post("/getuserallprojects", getAllUserProjects);

export default projectRouter;