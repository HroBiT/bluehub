import Card from "@/Components/Card/Card";
import prisma from "@/lib/db";



export default async function Home() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
    },
    })

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="p-6 rounded-lg w-full max-w-6xl">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            {products.map((product) => (
              <Card
                key={product.id}
                title={product.name}
                description={product.description}
                id={product.id}
                price={product.price}
                image={product.image.path}
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