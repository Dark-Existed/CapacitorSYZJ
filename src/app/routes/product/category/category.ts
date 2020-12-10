export interface Category {
    id: number,
    name: string,
    children: Array<Category>
}