import { prisma } from "@/lib/db";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const postId = parseInt(resolvedParams.id, 10);
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Post {post?.title}</h1>
      <p className="text-lg text-gray-700">{post?.content}</p>
    </div>
  );
}