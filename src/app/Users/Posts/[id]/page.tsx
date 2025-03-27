import  prisma  from "@/lib/db";
import Image from "next/image";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}



export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const postId = parseInt(resolvedParams.id, 10);
  const product = await prisma.product.findUnique({
    where: {
      id: postId,
    },select:{
      id:true,
      name:true,
      description:true,
      price:true,
      image:true,
    }
  });


  return (
    <div className="bg-white rounded-2xl max-w-2xl mx-auto p-4">
            <Image 
        src={product?.image.path || " default.jpg"} 
        alt="Image Alt"
        width={100}
        height={100}
        className="rounded-lg mt-4"
      />
      <h1 className="text-3xl font-bold mb-4">Product Name: {product?.name}</h1>
      <p className="text-lg text-gray-700">About: {product?.description}</p>      
      <p>{product?.price} zł</p>

    <button className="bg-green-500 text-white p-2 mt-5 rounded-2xl -shadow-lg"> Add to cart </button>

    </div>
  );
}