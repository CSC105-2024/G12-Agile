import { PrismaClient, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();

const createTask = async (data: {
  sprintId: number;
  name: string;
  description?: string;
  point: number;
  status: TaskStatus;
  assigneeId?: number | null;
}) => prisma.task.create({ data });

const findTaskById = async (id: number) =>
    prisma.task.findUnique({
      where: { id },
      include: {
        assignee: {
          select: {
            id: true,
            firstname: true,
            email: true
          }
        },
        sprint: {
          select: {
            id: true,
            index: true
          }
        }
      }
    });
  

const updateTask = async (
  id: number,
  data: Partial<{
    name: string;
    description?: string;
    point: number;
    status: TaskStatus;
    assigneeId: number | null;
  }>
) => prisma.task.update({ where: { id }, data });

const removeTask = async (id: number) => prisma.task.delete({ where: { id } });

const findTasksByProjectId = async (projectId: number) => {
    return prisma.task.findMany({
      where: {
        sprint: {
          projectId
        }
      },
      include: {
        assignee: {
          select: {
            id: true,
            firstname: true,
            email: true
          }
        },
        sprint: {
          select: {
            id: true,
            index: true
          }
        }
      }
    });
  };

export {
  createTask,
  findTaskById,
  updateTask,
  removeTask,
  findTasksByProjectId,
};
