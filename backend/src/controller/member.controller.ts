import { addMember, removeMember, getAllMembers } from "../model/member.model.ts";
import { findProjectById } from "../model/project.model.ts";
import { logActivity } from "../model/activitylog.model.ts";

const addMemberController = async (c: any) => {
  const user = c.get("user");
  const { projectId, userId } = await c.req.json();
  const project = await findProjectById(projectId);
  if (!project || project.pmId !== user.id) return c.json({ error: "Unauthorized" }, 403);

  const member = await addMember(projectId, userId);
  await logActivity(user.id, `Added member ID ${userId} to project ID ${projectId}`);
  return c.json(member);
};

const removeMemberController = async (c: any) => {
  const user = c.get("user");
  const { projectId, userId } = await c.req.json();
  const project = await findProjectById(projectId);
  if (!project || project.pmId !== user.id) return c.json({ error: "Unauthorized" }, 403);

  await removeMember(projectId, userId);
  await logActivity(user.id, `Removed member ID ${userId} from project ID ${projectId}`);
  return c.json({ message: "Member removed" });
};

const getAllMembersController = async (c: any) => {
  const projectId = parseInt(c.req.param("projectId"));
  const user = c.get("user");
  const project = await findProjectById(projectId);
  if (!project || project.pmId !== user.id) return c.json({ error: "Unauthorized" }, 403);

  const members = await getAllMembers(projectId);
  return c.json(members);
};

export { addMemberController, removeMemberController, getAllMembersController };
