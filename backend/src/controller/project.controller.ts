import {
  createProject,
  findProjects,
  findProjectById,
  updateProject,
  removeProjectWithDependencies,
} from "../model/project.model.ts";
import { createSprint,} from "../model/sprint.model.ts";
import {
  addMember,
  removeMember,
  findMembersByProjectId,
} from "../model/member.model.ts";
import { findUserByEmail } from "../model/user.model.ts";
import { logActivity } from "../model/activitylog.model.ts";
import { ProjectStatus } from "@prisma/client";

const createFullProjectController = async (c: any) => {
  try {
    const user = c.get("user");
    if (user.role !== "PM")
      return c.json({ error: "Only PM can create projects" }, 403);

    const { name, description, startDate, endDate, members, sprints } =
      await c.req.json();
    const membersArray = Array.isArray(members) ? members : [];

    const project = await createProject({
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: ProjectStatus.NotStarted,
      pmId: user.id,
    });

    for (const email of membersArray) {
      const userObj = await findUserByEmail(email);
      if (userObj) {
        await addMember(project.id, userObj.id);
      }
    }

    for (let i = 0; i < sprints.length; i++) {
      const s = sprints[i];
      await createSprint({
        projectId: project.id,
        index: i + 1,
        startDate: new Date(s.start),
        duration: s.duration,
        expectedPoints: parseInt(s.points),
      });
    }

    await logActivity(user.id, `Created full project: ${name}`);
    return c.json({
      message: "Project created successfully",
      projectId: project.id,
    });
  } catch (err) {
    console.error("Create Project Error:", err);
    return c.json({ error: "Failed to create project" }, 500);
  }
};

const getAllProjects = async (c: any) => {
  const user = c.get("user");

  const allProjects = await findProjects({
    include: {
      members: {
        include: {
          user: {
            select: {
              firstname: true,
              lastname: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (user.role === "PM") {
    return c.json(allProjects.filter((p) => p.pmId === user.id));
  } else {
    return c.json(
      allProjects.filter((p) =>
        p.members.some((m) => m.userId === user.id)
      )
    );
  }
};

const getProjectByIdController = async (c: any) => {
  const id = parseInt(c.req.param("id"));
  const project = await findProjectById(id);
  if (!project) return c.json({ error: "Project not found" }, 404);
  return c.json(project);
};

const updateProjectController = async (c: any) => {
  const id = parseInt(c.req.param("id"));
  const user = c.get("user");

  const project = await findProjectById(id);
  if (!project || user.id !== project.pmId)
    return c.json({ error: "Unauthorized" }, 403);
    

  const { name, description, startDate, endDate, members } =
    await c.req.json();

  await updateProject(id, {
    name,
    description,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });

  if (Array.isArray(members)) {
    const currentMembers = await findMembersByProjectId(id);
    const currentEmails = currentMembers.map((m: { user: { email: any; }; }) => m.user.email);

    const toRemove = currentMembers.filter(
      (m: { user: { email: any; }; }) => !members.includes(m.user.email)
    );
    const toAdd = members.filter((email) => !currentEmails.includes(email));

    for (const member of toRemove) {
      await removeMember(id, member.userId);
    }

    for (const email of toAdd) {
      const userObj = await findUserByEmail(email);
      if (userObj) {
        await addMember(id, userObj.id);
      }
    }
  }

  await logActivity(user.id, `Updated project ID ${id}`);
  return c.json({ message: "Project updated successfully" });
};

const deleteProjectController = async (c: any) => {
  const id = parseInt(c.req.param("id"));
  const user = c.get("user");

  const project = await findProjectById(id);
  if (!project || user.id !== project.pmId)
    return c.json({ error: "Unauthorized" }, 403);

  try {
    console.log(">> Deleting project ID", id);
    await removeProjectWithDependencies(id);
    console.log(">> Project deleted from DB");

    await logActivity(user.id, `Deleted project ID ${id}`);
    return c.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Delete Project Error:", err);
    return c.json({ error: "Failed to delete project" }, 500);
  }
};

export {
  createFullProjectController,
  getAllProjects,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController,
};
