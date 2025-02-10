import { prisma } from "@/lib/db";

interface PostPageProps {
  params: { id: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const postId = parseInt(params.id, 10);
  const post = await prisma.product.findUnique({
    where: { id: postId },
  });

  return (
    <div className="bg-white rounded-2xl max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Post {post?.name}</h1>
      <p className="text-lg text-gray-700">{post?.description}</p>      
      <p>{post?.price} zł</p>
    </div>
  );
}

// ✅ Dodaj tę funkcję, jeśli używasz output: "export"
export async function generateStaticParams() {
  const posts = await prisma.product.findMany({
    select: { id: true },
  });

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}
