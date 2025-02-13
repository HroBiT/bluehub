
import prisma from '../lib/db';

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

export async function addProduct(name: string, description: string, price: number) {
  const addedProduct = await prisma.product.create({
      data: {
          name,
          description,
          price,
      },
  });
  return addedProduct;
}

export async function getProducts() {
  const products = await prisma.product.findMany();
  return products;
}




















