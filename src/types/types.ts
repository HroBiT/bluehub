export type CartItem = {
    id: number;
    productId: number;
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  };
  
  export type Session = {
    login: string;
    name: string;
    isAdmin: boolean;
    UserId: number;
  };