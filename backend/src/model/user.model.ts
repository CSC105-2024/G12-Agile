import { PrismaClient, Role, } from '@prisma/client';

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
    throw new Error('Invalid role');
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

const findUsers = async () => {
  return prisma.user.findMany();
};

const findUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const updateUser = async (
  id: number,
  data: { firstname?: string; lastname?: string; email?: string; password?: string }
) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

const removeUser = async (id: number) => {
  return prisma.user.delete({
    where: { id },
  });
};

export { createUser, findUsers, findUserById, updateUser, removeUser };
