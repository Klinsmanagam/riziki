export class Product
{
    user = '';
    name = '';
    variations: Variation[];
}
export class Variation
{   
    min_qtty: number;
    qtty = '';
    price: number;
    name = '';
}