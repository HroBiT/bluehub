import  prisma  from "@/lib/db";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await prisma.product.findMany();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Wszystkie posty</h1>
      <ul className="space-y-4">
        {posts.map((post) => {
          return (
            <li key={post.id} className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition">
              <Link href={`/Pages/Posts/${post.id}`}  className="text-2xl font-semibold text-blue-600 hover:underline">
                  {post.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}