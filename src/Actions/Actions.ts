<<<<<<< HEAD

import prisma from '../lib/db';
=======
import { prisma } from "@/lib/db";
>>>>>>> 65898da838e4c6c9417c1e0aef32b6ab1833c9d2

type CreateUserProps = {
  email: string;
  name: string;
  password: string;
  login: string;
};

type LoginProps = {
  login: string;
  password: string;
  isAdmin?: boolean;
};

export async function CreateUser({ email, name, password, login }: CreateUserProps) {
  await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: password,
      Login: login,
    },
  });
}

export async function Login({ login, password }: LoginProps) {
  const user = await prisma.user.findFirst({
    where: {
      Login: login,
      password: password,
    },
  });

  if (!user) {
    throw new Error('Invalid login or password');
  }

  return { login: user.Login, name: user.name, isAdmin: user.isAdmin, userId: user.id };
}