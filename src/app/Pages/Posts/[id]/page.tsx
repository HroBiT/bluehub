import  prisma  from "@/lib/db";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}



export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const postId = parseInt(resolvedParams.id, 10);
  const post = await prisma.product.findUnique({
    where: {
      id: postId,
    },
  });

  return (
    <div className="bg-white rounded-2xl max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Post {post?.name}</h1>
      <p className="text-lg text-gray-700">{post?.description}</p>      
      <p>{post?.price} zł</p>
    </div>
  );
}