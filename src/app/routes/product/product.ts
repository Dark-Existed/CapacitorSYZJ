export interface Product {
    id: number;
    name: string;
    categoryId: number;
    barcode: string;
    images: string[];
    sellPrice: number;
    purchasePrice: number;
    stock: number;
    specification: string;
    supplier: string;
    remark: string;
}
