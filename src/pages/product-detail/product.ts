export class Product
{
  name: string;
  dist: string;
  sku: string;
  qtty: string;
  photo: string;
  packsize: string;
  price: string;
}
export class Brand
{
  dist: string;
  brand: string;
  category: string;
  photo: string;
  variations: Variations[];
}
export class Variations
{
  packsize: string;
  sku: number;
  dist: string;
  price: number;
  name: string;
  photo: string;
}
export const illara: Brand[] =
[
  {
   dist: 'Ilara Distributors',
   brand: 'Ilara',
   category: 'Milk',
   photo: 'assets/img/illara.jpg',
   variations:
                [
                  {'name': 'Ilara Fresh 500ml',
                   'price': 53,
                   'dist': 'Ilara Distributors',
                   'sku': 4560,
                   'packsize': '500ml',
                   'photo': 'assets/img/illara.jpg'
                 },
                 {'name': 'Ilara Fresh 200ml',
                  'price': 17,
                  'dist': 'Ilara Distributors',
                  'sku': 4561,
                  'packsize': '200ml',
                  'photo': 'assets/img/illara.jpg'
                },
                 {'name': 'Brookside UHT Fino 500ml',
                  'price': 58,
                  'dist': 'Ilara Distributors',
                  'sku': 4562,
                  'packsize': '500ml',
                  'photo': 'assets/img/ilaraUht.jpg'
                },
                {'name': 'TCA Brookside 500ml',
                 'price': 58,
                 'dist': 'Ilara Distributors',
                 'sku': 4563,
                 'packsize': '500ml',
                 'photo': 'assets/img/ilaratca500.jpg'
               },
                {'name': 'TCA Brookside 200ml',
                 'price': 31,
                 'dist': 'Ilara Distributors',
                 'sku': 4564,
                 'packsize': '200ml',
                 'photo': 'assets/img/ilaratca.jpg'
                }

                ]

  },

  {                'dist': 'Ilara Distributors',
                   'brand': 'Ilara Yoghurt',
                   'category': 'Yoghurt',
                   'photo': 'assets/img/ilasy5.jpg',
                   'variations':
                                [
                                  {'name': 'Ilara Yoghurt Vanilla 500ml',
                                   'price': 88,
                                   'dist': 'Ilara Distributors',
                                   'sku': 4565,
                                   'packsize': '500ml',
                                  'photo': 'assets/img/vanilla.jpg'
                                 },
                                 {'name': 'Ilara Yoghurt Strawberry 500ml',
                                  'price': 88,
                                  'dist': 'Ilara Distributors',
                                  'sku': 4566,
                                  'packsize': '500ml',
                                  'photo': 'assets/img/straw.jpg'
                                },
                                 {'name': 'Ilara Yoghurt Vanilla 250ml',
                                  'price': 52,
                                  'dist': 'Ilara Distributors',
                                  'sku': 4567,
                                  'packsize': '250ml',
                                  'photo': 'assets/img/vanilla.jpg'
                                },
                                {'name': 'Ilara Yoghurt Strawberry 250ml',
                                 'price': 52,
                                 'dist': 'Ilara Distributors',
                                 'sku': 4568,
                                 'packsize': '250ml',
                                 'photo': 'assets/img/straw.jpg'
                               },
                                {'name': 'Ilara Yoghurt Vanilla 150ml',
                                 'price': 42,
                                 'dist': 'Ilara Distributors',
                                 'sku': 4569,
                                 'packsize': '150ml',
                                 'photo': 'assets/img/vanilla.jpg'
                               },
                                {'name': 'Ilara Yoghurt Strawberry 150ml',
                                 'price': 42,
                                 'dist': 'Ilara Distributors',
                                 'sku': 4570,
                                 'packsize': '150ml',
                                 'photo': 'assets/img/straw.jpg'
                                }

                                ]

                  },
                  { 'dist': 'Ilara Distributors',
                    'brand': 'Delamere Cups Youghurt',
                                   'category': 'Yoghurt',
                                   'photo': 'assets/img/delamere.jpg',
                                   'variations':
                                                [
                                                  {'name': 'Strawberry 450ml',
                                                   'price': 113,
                                                   'dist': 'Ilara Distributors',
                                                   'sku': 4571,
                                                   'packsize': '450ml',
                                                   'photo': 'assets/img/delY.png'
                                                 },
                                                 {'name': 'Vanilla 450ml',
                                                  'price': 113,
                                                  'dist': 'Ilara Distributors',
                                                  'sku': 4572,
                                                  'packsize': '450ml',
                                                  'photo': 'assets/img/delY.png'
                                                },
                                                {'name': 'Lemon Biscuit 450ml',
                                                 'price': 113,
                                                 'dist': 'Ilara Distributors',
                                                 'sku': 4573,
                                                 'packsize': '450ml',
                                                 'photo': 'assets/img/delY.png'
                                               },
                                                {'name': 'Strawberry 250ml',
                                                 'price': 60,
                                                 'dist': 'Ilara Distributors',
                                                 'sku': 4574,
                                                 'packsize': '250ml',
                                                 'photo': 'assets/img/delY.png'
                                               },
                                                {'name': 'Vanilla 250ml',
                                                 'price': 60,
                                                 'dist': 'Ilara Distributors',
                                                 'sku': 4575,
                                                 'packsize': '250ml',
                                                 'photo': 'assets/img/delY.png'
                                               },
                                                {'name': 'Lemon Biscuit 250ml',
                                                 'price': 60,
                                                 'sku': 4576,
                                                 'dist': 'Ilara Distributors',
                                                 'packsize': '250ml',
                                                 'photo': 'assets/img/delY.png'
                                               },
                                               {'name': 'Strawberry 150ml',
                                                'price': 50,
                                                'dist': 'Ilara Distributors',
                                                'sku': 4577,
                                                'packsize': '150ml',
                                                'photo': 'assets/img/delY.png'
                                              },
                                              {'name': 'Vanilla 150ml',
                                               'price': 50,
                                               'dist': 'Ilara Distributors',
                                               'sku': 4578,
                                               'packsize': '150ml',
                                               'photo': 'assets/img/delY.png'
                                             },
                                             {'name': 'Lemon Biscuit 150ml',
                                              'price': 50,
                                              'dist': 'Ilara Distributors',
                                              'sku': 4579,
                                              'packsize': '150ml',
                                              'photo': 'assets/img/delY.png'
                                             }

                          ]
            }



];
export const tuzo: Brand[] =
[
  {
   'dist': 'Tuzo Milk Distributors',
   'brand': 'Tuzo',
   'category': 'Milk',
   'photo': 'assets/img/tuzo.jpeg',
   'variations':
                [
                  {'name': 'Tuzo Fresh 500ml',
                   'price': 53,
                   'dist': 'Tuzo Milk Distributors',
                   'sku': 4580,
                   'packsize': '500ml',
                   'photo': 'assets/img/tuzo.jpeg'
                 },
                 {'name': 'Tuzo Mala',
                  'price': 76,
                  'dist': 'Tuzo Milk Distributors',
                  'sku': 4581,
                  'packsize': '500ml',
                  'photo': 'assets/img/tuzo_mala.jpg'
                },
                 {'name': 'Tuzo UHT Fino 500ml',
                  'price': 58,
                  'dist': 'Tuzo Milk Distributors',
                  'sku': 4582,
                  'packsize': '500ml',
                  'photo': 'assets/img/tuzo_fino.jpg'
                },
                {'name': 'Tuzo TCA 200ml',
                 'price': 32,
                 'dist': 'Tuzo Milk Distributors',
                 'sku': 4583,
                 'packsize': '200ml',
                 'photo': 'assets/img/tuzo_tca.jpeg'
               }


                ]

  }
 ]
