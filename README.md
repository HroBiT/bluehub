*Dokumentacja Projektu BlueHub *

Przegląd Projektu 

BlueHub to platforma e-commerce zbudowana przy użyciu Next.js, React i Prisma. Umożliwia użytkownikom przeglądanie produktów, dodawanie ich do koszyka oraz finalizowanie zamówienia. Dodatkowo zawiera panel administracyjny do zarządzania produktami. 

Funkcjonalności 

Autoryzacja Użytkowników 

Rejestracja: Użytkownicy mogą się rejestrować, podając adres e-mail, login, imię oraz hasło. 

Logowanie: Możliwość logowania przy użyciu loginu i hasła. 

Zarządzanie sesją: Sesje użytkowników są zarządzane przy użyciu local storage. 

Zarządzanie Produktami 

Przegląd produktów: Użytkownicy mogą przeglądać listę produktów na stronie głównej. 

Szczegóły produktu: Możliwość zobaczenia szczegółowych informacji o produkcie po kliknięciu. 

Panel administracyjny: Administratorzy mogą dodawać nowe produkty oraz przeglądać istniejące. 

Zarządzanie Koszykiem 

Dodawanie do koszyka: Użytkownicy mogą dodawać produkty do koszyka. 

Podgląd koszyka: Możliwość przeglądania zawartości koszyka. 

Usuwanie z koszyka: Użytkownicy mogą usuwać produkty z koszyka. 

Finalizacja zamówienia: Możliwość przejścia do procesu płatności z poziomu koszyka. 

API - Punkty Końcowe 

Endpointy Użytkowników 

POST /api/createUser – Tworzy nowego użytkownika. 

POST /api/login – Uwierzytelnia użytkownika i zwraca dane sesji. 

Endpointy Produktów 

GET /api/get-products – Pobiera listę produktów. 

POST /api/add-to-cart – Dodaje produkt do koszyka użytkownika. 

POST /api/remove-from-cart – Usuwa produkt z koszyka użytkownika. 

GET /api/get-cart-items – Pobiera produkty znajdujące się w koszyku użytkownika. 

Struktura Plików 

src/app/Pages/api – Zawiera obsługę punktów końcowych API. 

src/app/Pages – Zawiera komponenty stron dla różnych tras. 

src/Components – Zawiera wielokrotnego użytku komponenty UI. 

src/Actions – Zawiera funkcje do interakcji z bazą danych. 

src/lib – Zawiera funkcje pomocnicze i konfiguracje. 

prisma – Zawiera schemat Prisma i pliki migracji. 

public – Zawiera statyczne zasoby. 

Schemat Bazy Danych 

Schemat bazy danych jest definiowany przy użyciu Prisma i zawiera następujące modele: 

User – Reprezentuje użytkownika w systemie. 

Cart – Reprezentuje koszyk użytkownika. 

CartItem – Reprezentuje produkt w koszyku użytkownika. 

Product – Reprezentuje produkt dostępny do zakupu. 

Pierwsze Kroki 

Aby uruchomić serwer deweloperski: 

npm install 
npm run dev 

Otwórz przeglądarkę i przejdź do http://localhost:3000, aby zobaczyć działającą aplikację. 

Wdrożenie 

Najłatwiejszym sposobem wdrożenia aplikacji Next.js jest skorzystanie z platformy Vercel, stworzonej przez twórców Next.js. Szczegóły znajdziesz w oficjalnej dokumentacji wdrożenia Next.js. 

 
