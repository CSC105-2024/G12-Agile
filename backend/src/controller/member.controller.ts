import { addMember, removeMember, getAllMembers, getMemberByProjectAndUser } from "../model/member.model.ts";
import { findProjectById } from "../model/project.model.ts";
import { findUserByEmail } from "../model/user.model.ts"; 
import { logActivity } from "../model/activitylog.model.ts";

const addMemberController = async (c: any) => {
  const user = c.get("user");
  const { projectId, email } = await c.req.json();
  const project = await findProjectById(projectId);
  if (!project || project.pmId !== user.id) return c.json({ error: "Unauthorized" }, 403);


  const userObj = await findUserByEmail(email);
  if (!userObj) return c.json({ error: "User not found" }, 404);

  const existingMember = await getMemberByProjectAndUser(projectId, userObj.id);
  if (existingMember) {
    return c.json({ error: "Member already exists in project" }, 400);
  }


  const member = await addMember(projectId, userObj.id);
  await logActivity(user.id, `Added member ${email} to project ID ${projectId}`);
  return c.json(member);
};

const removeMemberController = async (c: any) => {
  const user = c.get("user");
  const { projectId, email } = await c.req.json();
  const project = await findProjectById(projectId);
  if (!project || project.pmId !== user.id) return c.json({ error: "Unauthorized" }, 403);


  const userObj = await findUserByEmail(email);
  if (!userObj) return c.json({ error: "User not found" }, 404);

  await removeMember(projectId, userObj.id);
  await logActivity(user.id, `Removed member ${email} from project ID ${projectId}`);
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
