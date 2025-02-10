import Link from "next/link";

type CardProps = {
    title: string;
    content: string;
    id: number;
};


export function Card({title, content, id}: CardProps){
    return(
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-600 ">{title}</h1>
            <p>{content}</p>
            <Link href={`/Pages/Posts/${id}`}>Czytaj wiecej</Link>
        </div>
    )
};

export default Card;