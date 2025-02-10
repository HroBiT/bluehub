import Card from "@/Components/Card/Card";
import { prisma } from "@/lib/db";

export default async function Home() {
  const Product = await prisma.product.findMany();

  return (
    <div className=" flex justify-center items-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        {Product && Product.length > 0 ? (
          Product.map((product) => (
            <Card
              key={product.id}
              title={product.name}
              description={product.description}
              id={product.id}
              price={product.price}
            />
          ))
        ) : (
          <p className="text-center text-gray-700">Brak produktów</p>
        )}
      </div>
    </div>
  );
}