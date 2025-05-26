import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}) => {
  const roleEnum = data.role as Role;
  if (!Object.values(Role).includes(roleEnum)) {
    throw new Error("Invalid role");
  }
  return prisma.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      role: roleEnum,
    },
  });
};

const findUsers = async () => prisma.user.findMany();
const findUserById = async (id: number) => prisma.user.findUnique({ where: { id } });
const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, firstname: true, lastname: true }  
  });
};

const updateUser = async (
  id: number,
  data: Partial<{ firstname: string; lastname: string; email: string; password: string }>
) => prisma.user.update({ where: { id }, data });

const removeUser = async (id: number) => prisma.user.delete({ where: { id } });

export { createUser, findUsers, findUserById, findUserByEmail, updateUser, removeUser };