import {
    createTask,
    findTaskById,
    updateTask,
    removeTask,
    findTasksByProjectId,
  } from "../model/task.model.ts";
  import { findSprintById, findSprintByProjectIdAndIndex } from "../model/sprint.model.ts";
  import { findProjectById, updateProject } from "../model/project.model.ts";
  import { logActivity } from "../model/activitylog.model.ts";
  import { TaskStatus, ProjectStatus } from "@prisma/client";
  
  const createTaskController = async (c: any) => {
    const user = c.get("user");
    const { projectId, sprintIndex, name, description, point } = await c.req.json();
  
    if (user.role !== "PM") {
      return c.json({ error: "Only PM can create tasks" }, 403);
    }
  
    const project = await findProjectById(projectId);
    if (!project || project.pmId !== user.id) return c.json({ error: "Unauthorized" }, 403);
  
    const sprint = await findSprintByProjectIdAndIndex(projectId, sprintIndex);
    if (!sprint) return c.json({ error: "Sprint not found" }, 404);
  
    const task = await createTask({
      sprintId: sprint.id,
      name,
      description,
      point,
      status: TaskStatus.NotStarted,
    });
  
    await logActivity(user.id, `Created task: ${task.name}`);
    return c.json(task);
  };
  
  const getTaskById = async (c: any) => {
    const taskId = parseInt(c.req.param("id"));
    const task = await findTaskById(taskId);
    if (!task) return c.json({ error: "Task not found" }, 404);
    return c.json(task);
  };
  
  const getTasksByProjectId = async (c: any) => {
    const projectId = parseInt(c.req.param("projectId"));
    const tasks = await findTasksByProjectId(projectId);
    return c.json(tasks);
  };
  
  const claimTaskByEmail = async (c: any) => {
    const taskId = parseInt(c.req.param("id"));
    const { email } = await c.req.json();
    const user = c.get("user");
  
    if (user.role !== "Dev") {
      return c.json({ error: "Only Dev can claim tasks" }, 403);
    }
  
    if (user.email !== email) {
      return c.json({ error: "You can only assign yourself" }, 403);
    }
  
    const task = await findTaskById(taskId);
    if (!task) return c.json({ error: "Task not found" }, 404);
  
    const updated = await updateTask(taskId, { assigneeId: user.id });
  
    const sprint = await findSprintById(task.sprintId);
    const project = sprint && await findProjectById(sprint.projectId);
    if (project && project.status === ProjectStatus.NotStarted) {
      await updateProject(project.id, { status: ProjectStatus.InProgress });
    }
  
    await logActivity(user.id, `Claimed task ID ${taskId}`);
    return c.json({ message: "Task claimed successfully", task: updated });
  };
  
  const updateTaskController = async (c: any) => {
    const user = c.get("user");
    const taskId = parseInt(c.req.param("id"));
    const data = await c.req.json();
    const task = await findTaskById(taskId);
    if (!task) return c.json({ error: "Task not found" }, 404);
  
    const sprint = await findSprintById(task.sprintId);
    const project = sprint && await findProjectById(sprint.projectId);
    if (!sprint || !project) return c.json({ error: "Sprint or Project not found" }, 404);
  
    if (user.role === "PM") {
      const updated = await updateTask(taskId, data);
      await logActivity(user.id, `PM updated task ID ${taskId}`);
      return c.json(updated);
    }
  
    if (user.role === "Dev") {
      const allowedFields = ["status", "assigneeId"];
      const invalidField = Object.keys(data).find((key) => !allowedFields.includes(key));
      if (invalidField) return c.json({ error: `Devs can only edit status or claim task` }, 403);
  
      if (data.assigneeId && data.assigneeId !== user.id) {
        return c.json({ error: "Dev can only assign themselves" }, 403);
      }
  
      const updated = await updateTask(taskId, {
        ...("status" in data ? { status: data.status } : {}),
        ...("assigneeId" in data ? { assigneeId: user.id } : {})
      });
  
      if (data.status === TaskStatus.Completed) {
        const tasks = await findTasksByProjectId(project.id);
        const allCompleted = tasks.every((t) => t.status === TaskStatus.Completed || t.id === taskId);
        if (allCompleted) {
          await updateProject(project.id, { status: ProjectStatus.Completed });
        }
      }
  
      await logActivity(user.id, `Dev updated task ID ${taskId}`);
      return c.json(updated);
    }
  
    return c.json({ error: "Unauthorized" }, 403);
  };
  
  const deleteTaskController = async (c: any) => {
    const user = c.get("user");
    const taskId = parseInt(c.req.param("id"));
    const task = await findTaskById(taskId);
    if (!task) return c.json({ error: "Task not found" }, 404);
  
    const sprint = await findSprintById(task.sprintId);
    const project = sprint && await findProjectById(sprint.projectId);
    if (!project || project.pmId !== user.id) return c.json({ error: "Unauthorized" }, 403);
  
    await removeTask(taskId);
    await logActivity(user.id, `Deleted task ID ${taskId}`);
    return c.json({ message: "Task deleted" });
  };
  
  export {
    createTaskController,
    updateTaskController,
    deleteTaskController,
    getTaskById,
    getTasksByProjectId,
    claimTaskByEmail
  };
  