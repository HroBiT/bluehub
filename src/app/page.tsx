import Card from "@/Components/Card/Card";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

// Funkcja do pobierania danych (serwerowa)
async function fetchProducts(): Promise<Product[]> {
  // Przykładowe dane produktów (zastąp je wywołaniem zewnętrznego API, jeśli to konieczne)
  const products: Product[] = [
    { id: 1, name: "Product 1", description: "Description 1", price: 100 },
    { id: 2, name: "Product 2", description: "Description 2", price: 200 },
    { id: 3, name: "Product 3", description: "Description 3", price: 300 },
  ];

  return products;
}

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="flex justify-center items-center min-h-screen p-4 ">
      <div className="p-6 rounded-lg w-full max-w-6xl">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
            {products.map((product: Product) => (
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