import {
    createSprint,
    findSprintById,
    findSprintsByProjectId,
    updateSprint,
    removeSprint
  } from "../model/sprint.model.ts";
  import { findProjectById } from "../model/project.model.ts";
  import { logActivity } from "../model/activitylog.model.ts";
  
  const createSprintController = async (c: any) => {
    const { projectId, startDate, duration, expectedPoints } = await c.req.json();
    const user = c.get("user");
  
    const project = await findProjectById(projectId);
    if (!project || project.pmId !== user.id) {
      return c.json({ error: "Unauthorized" }, 403);
    }
  
    const existingSprints = await findSprintsByProjectId(projectId);
    const nextIndex = existingSprints.length > 0
      ? Math.max(...existingSprints.map(s => s.index)) + 1
      : 1;
  
    const sprint = await createSprint({
      projectId,
      index: nextIndex,
      startDate: new Date(startDate),
      duration,
      expectedPoints
    });
  
    await logActivity(user.id, `Created sprint index: ${sprint.index}`);
    return c.json(sprint);
  };
  
  const getSprintsByProject = async (c: any) => {
    const projectId = parseInt(c.req.param("projectId"));
    const sprints = await findSprintsByProjectId(projectId);
    return c.json(sprints);
  };
  
  const getSprintById = async (c: any) => {
    const sprintId = parseInt(c.req.param("id"));
    const sprint = await findSprintById(sprintId);
    if (!sprint) return c.json({ error: "Sprint not found" }, 404);
    return c.json(sprint);
  };
  
  const updateSprintController = async (c: any) => {
    const sprintId = parseInt(c.req.param("id"));
    const data = await c.req.json();
    const user = c.get("user");
  
    const sprint = await findSprintById(sprintId);
    if (!sprint) return c.json({ error: "Sprint not found" }, 404);
  
    const project = await findProjectById(sprint.projectId);
    if (!project || project.pmId !== user.id) {
      return c.json({ error: "Unauthorized" }, 403);
    }
  
    const updated = await updateSprint(sprintId, data);
    await logActivity(user.id, `Updated sprint index: ${sprint.index}`);
    return c.json(updated);
  };
  
  const deleteSprintController = async (c: any) => {
    const sprintId = parseInt(c.req.param("id"));
    const user = c.get("user");
  
    const sprint = await findSprintById(sprintId);
    if (!sprint) return c.json({ error: "Sprint not found" }, 404);
  
    const project = await findProjectById(sprint.projectId);
    if (!project || project.pmId !== user.id) {
      return c.json({ error: "Unauthorized" }, 403);
    }
  
    await removeSprint(sprintId);
    await logActivity(user.id, `Deleted sprint index: ${sprint.index}`);
    return c.json({ message: "Sprint deleted" });
  };
  
  export {
    createSprintController,
    getSprintsByProject,
    updateSprintController,
    deleteSprintController,
    getSprintById
  };
  