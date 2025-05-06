import {
    createProject,
    findProjects,
    findProjectById,
    updateProject,
    removeProject,
  } from "../model/project.model.ts";
  import { ProjectStatus } from "@prisma/client";
  
  const createProjectController = async (c: any) => {
    const user = c.get("user");
    if (user.role !== "PM") return c.json({ error: "Only PMs can create projects" }, 403);
  
    const { name, description, startDate, endDate } = await c.req.json();
    const project = await createProject({
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: ProjectStatus.NotStarted,
      pmId: user.id,
    });
    return c.json(project);
  };
  
  const getProjectsController = async (c: any) => {
    const projects = await findProjects();
    return c.json(projects);
  };
  
  const getProjectByIdController = async (c: any) => {
    const id = Number(c.req.param("id"));
    const project = await findProjectById(id);
    if (!project) return c.json({ error: "Project not found" }, 404);
    return c.json(project);
  };
  
  const updateProjectController = async (c: any) => {
    const user = c.get("user");
    if (user.role !== "PM") return c.json({ error: "Only PMs can update projects" }, 403);
  
    const id = Number(c.req.param("id"));
    const data = await c.req.json();
    const updated = await updateProject(id, data);
    return c.json(updated);
  };
  
  const deleteProjectController = async (c: any) => {
    const user = c.get("user");
    if (user.role !== "PM") return c.json({ error: "Only PMs can delete projects" }, 403);
  
    const id = Number(c.req.param("id"));
    await removeProject(id);
    return c.json({ message: "Project deleted" });
  };
  
  export {
    createProjectController,
    getProjectsController,
    getProjectByIdController,
    updateProjectController,
    deleteProjectController,
  };
  