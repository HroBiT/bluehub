import Card from "@/Components/Card/Card";
import { prisma } from "@/lib/db";

export default async function Home() {

  const Product = await prisma.product.findMany();

  return (
      <div className="bg-gray-400 justify-center items-center flex h-screen">
          <div className="bg-white p-4 rounded-lg shadow-md">
            
            {
             Product && Product.length > 0 ? Product.map((product) => {
                return(
                  <Card key={product.id} title={product.name} description={product.description} id={product.id} price={product.price} />
                )
              }) : <p>Brak produktów</p>
            }

          </div>
      </div>
  );
}