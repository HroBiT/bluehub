import Link from "next/link";
import Card from "@/Components/Card/Card";

export default function Home() {
  
  return (
      <div className="bg-gray-400 justify-center items-center flex h-screen">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Card title="Testowy tytul" content="Testowa tresc" id={1}/>
          </div>
      </div>
  );
}