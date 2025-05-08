import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const calculateEndDate = (start: Date, duration: string): Date => {
  const msPerDay = 24 * 60 * 60 * 1000;
  const durationMap: Record<string, number> = {
    "1 week": 7,
    "2 week": 14,
    "3 week": 21,
    "4 week": 28,
    "1 month": 30,
  };
  const days = durationMap[duration] ?? 7;
  return new Date(start.getTime() + days * msPerDay);
};

const createSprint = async (data: {
    projectId: number;
    index: number;
    startDate: Date;
    duration: string;
    expectedPoints: number;
  }) => {
    const endDate = calculateEndDate(new Date(data.startDate), data.duration);
  
    return prisma.sprint.create({
      data: {
        projectId: data.projectId,
        index: data.index,
        startDate: data.startDate,
        endDate,
        duration: data.duration,
        expectedPoints: data.expectedPoints,
        achievedPoints: 0,
      },
    });
  };
  

const findSprintById = async (id: number) => {
  return prisma.sprint.findUnique({ where: { id } });
};

const findSprintsByProjectId = async (projectId: number) => {
  return prisma.sprint.findMany({
    where: { projectId },
    orderBy: { index: "asc" },
  });
};
const findSprintByProjectIdAndIndex = async (projectId: number, index: number) => {
    return prisma.sprint.findFirst({
      where: { projectId, index },
    });
  };
  

const updateSprint = async (
  id: number,
  data: Partial<{
    startDate: Date;
    endDate: Date;
    duration: string;
    expectedPoints: number;
    achievedPoints: number;
  }>
) => {
  return prisma.sprint.update({
    where: { id },
    data,
  });
};

const removeSprint = async (id: number) => {
  return prisma.sprint.delete({ where: { id } });
};

export {
  createSprint,
  findSprintById,
  findSprintsByProjectId,
  updateSprint,
  removeSprint,
  findSprintByProjectIdAndIndex

};
