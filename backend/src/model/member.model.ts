import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const addMember = async (projectId: number, userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { firstname: true, lastname: true }, 
  });

  if (!user) {
    throw new Error("User not found");
  }


  return prisma.projectMember.create({
    data: {
      projectId,
      userId,
      firstname: user.firstname, 
    },
  });
};

const removeMember = async (projectId: number, userId: number) => {
  return prisma.projectMember.delete({
    where: { projectId_userId: { projectId, userId } },
  });
};
const removeAllMembersFromProject = async (projectId: number) => {
  return prisma.projectMember.deleteMany({
    where: { projectId },
  });
};


const getMemberByProjectAndUser = async (projectId: number, userId: number) => {
  return prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
  });
};


const getAllMembers = async (projectId: number) => {
  return prisma.projectMember.findMany({
    where: { projectId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      },
    },
  });
};
const findMembersByProjectId = async (projectId: number) => {
  return prisma.projectMember.findMany({
    where: { projectId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true
        }
      }
    }
  });
};

export { addMember, removeMember, getAllMembers, getMemberByProjectAndUser,findMembersByProjectId,removeAllMembersFromProject };
