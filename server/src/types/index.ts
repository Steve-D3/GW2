import mongoose from 'mongoose';

export interface UserType {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
}

export interface ProductType {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category_id: mongoose.Schema.Types.ObjectId;
    image_url: {
        id: number;
        url: string;
        description?: string;
    }[];
    created_at: Date;
}


export interface CategoryType {
    _id: string;
    name: string;
    description: string;
}

export interface OrderType {
    _id: string;
    user_id: mongoose.Schema.Types.ObjectId;
    products: {
        product_id: mongoose.Schema.Types.ObjectId;
        quantity: number;
    }[];
    total_price: number;
    created_at: Date;
    updated_at: Date;
}

export interface WishlistType {
    _id: string;
    user_id: mongoose.Schema.Types.ObjectId;
    products: mongoose.Schema.Types.ObjectId[];
    total_price: number;
    created_at: Date;
    updated_at: Date;
}

export interface ReviewType {
    _id: string;
    user_id: mongoose.Schema.Types.ObjectId;
    product_id: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
}