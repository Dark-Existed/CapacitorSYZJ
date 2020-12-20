import { Supplier } from 'src/app/shared/class/supplier';

export class Product {
    id: string;
    name: string;
    categoryId: number;
    barcode: string;
    images: string[];
    sellPrice: number;
    purchasePrice: number;
    stock: number;
    specification: string;
    supplier: Supplier;
    remark: string;
    constructor() {
        this.supplier = new Supplier();
    }
}
