import Card from "@/Components/Card/Card";
import { prisma } from "@/lib/db";

export default async function Home() {
  const Product = await prisma.product.findMany();

  return (
    <div className="flex justify-center items-center min-h-screen p-4 ">
      <div className="p-6 rounded-lg w-full max-w-6xl">
        {Product && Product.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
            {Product.map((product) => (
              <Card
                key={product.id}
                title={product.name}
                description={product.description}
                id={product.id}
                price={product.price}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700">Brak produktów</p>
        )}
      </div>
    </div>
  );
}