import { createProject, findProjects, findProjectById, updateProject, removeProject } from "../model/project.model.ts";
import { logActivity } from "../model/activitylog.model.ts";

const createProjectController = async (c: any) => {
  const body = await c.req.json();
  const user = c.get("user");
  if (user.role !== "PM") return c.json({ error: "Only PM can create projects" }, 403);

  const project = await createProject({ ...body, pmId: user.id });
  await logActivity(user.id, `Created project: ${body.name}`);
  return c.json(project);
};

const getAllProjects = async (c: any) => {
  const projects = await findProjects();
  return c.json(projects);
};

const getProjectByIdController = async (c: any) => {
  const id = parseInt(c.req.param("id"));
  const project = await findProjectById(id);
  if (!project) return c.json({ error: "Project not found" }, 404);
  return c.json(project);
};

const updateProjectController = async (c: any) => {
  const id = parseInt(c.req.param("id"));
  const body = await c.req.json();
  const user = c.get("user");
  const project = await findProjectById(id);
  if (!project || user.id !== project.pmId) return c.json({ error: "Unauthorized" }, 403);

  const updated = await updateProject(id, body);
  await logActivity(user.id, `Updated project ID ${id}`);
  return c.json(updated);
};

const deleteProjectController = async (c: any) => {
  const id = parseInt(c.req.param("id"));
  const user = c.get("user");
  const project = await findProjectById(id);
  if (!project || user.id !== project.pmId) return c.json({ error: "Unauthorized" }, 403);

  await removeProject(id);
  await logActivity(user.id, `Deleted project ID ${id}`);
  return c.json({ message: "Project deleted" });
};

export {
  createProjectController,
  getAllProjects,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController
};
