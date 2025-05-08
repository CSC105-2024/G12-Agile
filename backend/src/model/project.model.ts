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

const findProjects = async () => prisma.project.findMany({ include: { pm: true, members: true, sprints: true } });
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
const removeProject = async (id: number) => prisma.project.delete({ where: { id } });

export { createProject, findProjects, findProjectById, updateProject, removeProject };