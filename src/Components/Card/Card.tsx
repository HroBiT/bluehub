import Link from "next/link";

type CardProps = {
    title: string;
    description: string;
    id: number;
    price?: number;
};


export function Card({title, description, id,price}: CardProps){
    return(
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-600 ">{title}</h1>
            <p>{description}</p>
            <p>{price} zł</p>
            <Link href={`/Pages/Posts/${id}`}>Czytaj wiecej</Link>
            <button>Dodaj do koszykas</button>
        </div>
    )
};

export default Card;