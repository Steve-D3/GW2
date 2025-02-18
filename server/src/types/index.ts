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
    image_url: string;
    created_at: Date;
}