import { Supplier } from 'src/app/shared/class/supplier';
import { CategoryService } from './category/category.service';

export class Product {
    id: string;
    name: string;
    categoryId: number;
    categoryName: string;
    barcode: string;
    images: string[];
    sellPrice: number;
    purchasePrice: number;
    stock: number;
    specification: string;
    supplier: Supplier;
    remark: string;
    constructor() {
        this.reset();
    }

    uuid(): string {
        const tempUrl = URL.createObjectURL(new Blob());
        const uuid = tempUrl.toString();
        URL.revokeObjectURL(tempUrl);
        return uuid.substr(uuid.lastIndexOf('/') + 1);
    }

    reset() {
        this.id = this.uuid();
        this.supplier = new Supplier();
    }

}
