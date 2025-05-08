import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addMember = async (projectId: number, userId: number) => {
  return prisma.projectMember.create({
    data: { projectId, userId },
  });
};

const removeMember = async (projectId: number, userId: number) => {
  return prisma.projectMember.delete({
    where: { projectId_userId: { projectId, userId } },
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
          lastname: true
        }
      }
    }
  });
};

export { addMember, removeMember, getAllMembers };
