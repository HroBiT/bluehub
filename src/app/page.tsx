import Link from "next/link";


export default function Home() {
  
  return (
    <>
      <h1>Podstawowa strona </h1>
      <Link href="Pages/Posts">Przejdź do strony postów</Link><br/>
      <Link href="Pages/Login">Przejdź do strony logowania</Link><br/>
      <Link href="Pages/Register">Przejdź do strony rejestrowania konta</Link>
    </>
  );
}