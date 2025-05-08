import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const logActivity = async (userId: number, action: string) => {
  return prisma.activityLog.create({
    data: { userId, action },
  });
};

const getUserActivities = async (userId: number) => {
  return prisma.activityLog.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" },
  });
};
const getAllActivities = async () => {
    return prisma.activityLog.findMany({
      include: {
        user: {
          select: {
            email: true
          }
        }
      },
      orderBy: {
        timestamp: "desc"
      }
    });
  };

export { logActivity, getUserActivities, getAllActivities };