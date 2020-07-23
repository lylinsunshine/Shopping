import { manufacturer } from './manufacturer';

export interface product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    //manufacturerEntity: manufacturer;
}