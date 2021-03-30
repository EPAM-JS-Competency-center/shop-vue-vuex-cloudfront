interface Product {
    id: string,
    title: string,
    description: string,
    price: number,
};

interface Address {
    comment?: string | undefined;
    address: string;
    firstName: string;
    lastName: string;
}

interface CartItem {
    product: Product,
    count: number,
};

export type {
    Address,
    CartItem,
    Product,
}