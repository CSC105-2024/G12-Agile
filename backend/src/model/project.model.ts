import { PrismaClient, ProjectStatus } from "@prisma/client";

const prisma = new PrismaClient();

const createProject = async (data: {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: ProjectStatus;
  pmId: number;
}) => prisma.project.create({ data });

const findProjects = async (p0: { include: { members: { include: { user: { select: { firstname: boolean; lastname: boolean; email: boolean; }; }; }; }; }; }) => prisma.project.findMany({ include: { pm: true, members: true, sprints: true } });
const findProjectById = async (id: number) => {
  return prisma.project.findUnique({
    where: { id },
    include: {
      pm: true,
      members: {
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
      },
      sprints: true
    }
  });
};

const updateProject = async (
  id: number,
  data: Partial<{ name: string; description: string; startDate: Date; endDate: Date; status: ProjectStatus }>
) => prisma.project.update({ where: { id }, data });
const removeProject = async (id: number) => {
  return prisma.project.delete({
    where: { id }
  });
};

const findProjectsByPMId = async (pmId: number) =>
  prisma.project.findMany({
    where: { pmId },
    include: {
      pm: true,
      members: {
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
      },
      sprints: true,
    },
  });
  const removeProjectWithDependencies = async (projectId: number) => {
    await prisma.sprint.deleteMany({
      where: { projectId }
    });
  
    await prisma.projectMember.deleteMany({
      where: { projectId }
    });
  
    return prisma.project.delete({
      where: { id: projectId }
    });
  };
  

const findProjectsByMemberEmail = async (email: string) =>
  prisma.project.findMany({
    where: {
      members: {
        some: {
          user: {
            email: email,
          },
        },
      },
    },
    include: {
      pm: true,
      members: {
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
      },
      sprints: true,
    },
  });
  


export { createProject, findProjects, findProjectById, updateProject, removeProject, findProjectsByMemberEmail,findProjectsByPMId,removeProjectWithDependencies};