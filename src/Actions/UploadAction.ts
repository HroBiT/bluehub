"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export async function GetProducts() {
  return await prisma.product.findMany({
    include: {
      image: true,
    },
  });
}


export async function UploadImage(formData: FormData) {
  try {
    const file = formData.get("image") as File;
    
    if (!file) {
      throw new Error("No file uploaded");
    }

    // Sprawdź typ pliku
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    // Utwórz katalog, jeśli nie istnieje
    const uploadDir = path.join(process.cwd(), "public/media");
    await mkdir(uploadDir, { recursive: true });

    // Generuj unikalną nazwę pliku
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.webp`;
    const filePath = path.join(uploadDir, fileName);
    
    // Konwertuj obraz do WebP za pomocą sharp
    const buffer = Buffer.from(await file.arrayBuffer());
    const imageInfo = await sharp(buffer)
      .webp({ quality: 80 })
      .toBuffer({ resolveWithObject: true });
    
    // Zapisz plik
    await writeFile(filePath, imageInfo.data);
    
    // Zapisz informacje o obrazie w bazie danych
    const image = await prisma.image.create({
      data: {
        path: `/media/${fileName}`,
        size: imageInfo.info.size,
        width: imageInfo.info.width,
        height: imageInfo.info.height,
      },
    });
    
    revalidatePath("/admin");
    return image;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function AddProductWithImage(formData: FormData) {
  try {
    // Najpierw prześlij obraz
    const image = await UploadImage(formData);
    
    // Pobierz pozostałe dane produktu z formularza
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const category = formData.get("category") as string || "Electronics";
    
    if (!name || !description || isNaN(price)) {
      throw new Error("Invalid product data");
    }
    
    // Utwórz produkt z relacją do obrazu
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        imageId: image.id,
      },
      include: {
        image: true,
      },
    });
    
    revalidatePath("/admin");
    return product;
  } catch (error) {
    console.error("Error adding product with image:", error);
    throw error;
  }
}