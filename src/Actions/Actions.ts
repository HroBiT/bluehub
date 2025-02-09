"use server";

import { prisma } from "@/lib/db";

type CreateUserProps = {
    email: string;
    name: string;
    password: string;
    login: string;
};

type LoginProps = {
    login: string;
    password: string;
}


export async function CreateUser({ email, name, password, login }: CreateUserProps  ){
    await prisma.user.create({
        data:{
            email: email,
            name: name,
            password: password,
            Login: login
        }
    });
}

 // SZUKANIE PO PROPSIE RZECZY Z FORMA 

 export async function Login({ login, password }: LoginProps){
    const user = await prisma.user.findFirst({
        where:{
            Login: login,
            password: password
        }
    });
}


