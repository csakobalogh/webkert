import { Rating } from './Rating';

export interface Product {
    id: string;
    name: string;
    description: string;
    size: string;
    color: string;
    material: string;
    price: number;
    imageUrl: string;
    ratings: Rating[];
    avgRating?: number;
  }