
import { prisma } from "@/lib/db";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  name: string;
  updatedAt: Date;
  createdAt: Date;
  description: string;
  price: number;
  category: string;
}

export async function generateStaticParams() {
  const posts = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const postId = parseInt(id as string, 10);
        const fetchedPost = await prisma.product.findUnique({
          where: {
            id: postId,
          },
        });
        if (fetchedPost) {
          setPost(fetchedPost);
        }
      };

      fetchPost();
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-2xl max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Post {post.name}</h1>
      <p className="text-lg text-gray-700">{post.description}</p>      
      <p>{post.price} zł</p>
    </div>
  );
}