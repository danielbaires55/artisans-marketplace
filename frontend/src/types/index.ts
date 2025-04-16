export interface Artisan {
    id: number;
    name: string;
    description: string;
    location: string;
    profileImage?: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    details?: string;
    price: number;
    stockQuantity: number;
    image?: Blob;
    artisanId: number;
    artisan?: Artisan;
    categories: Category[];
}

export interface Category {
    id: number;
    name: string;
    description?: string;
}

export interface OrderItem {
    id: number;
    productId: number;
    quantity: number;
    priceAtTime: number;
    product?: Product;
}

export interface Order {
    id: number;
    userId: number;
    orderDate: string;
    status: string;
    totalAmount: number;
    shippingAddress: string;
    orderItems: OrderItem[];
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    orders?: Order[];
} 