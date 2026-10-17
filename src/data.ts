export type ProductVariant = { id:string; name:string; price:number; available:boolean; stockQuantity?:number; published?:boolean; visible?:boolean };
export type Product = { id:string; name:string; category:string; price:number; description:string; image:string; images?:string[]; variants?:ProductVariant[]; variantId?:string; variantLabel?:string; badge?:string; available?:boolean; adminImages?:import('./client').AdminImage[] };
export const categories = ['Todos los productos','Frutos congelados','Miel','Aceites','Pastas y Harinas'];
export const products: Product[] = [
 {id:'1',name:'Mix de frutos rojos',category:'Frutos congelados',price:14,description:'Frutillas, arándanos y frambuesas listas para disfrutar.',image:'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=900&q=85',badge:'Más elegido'},
 {id:'2',name:'Miel pura de monte',category:'Miel',price:18,description:'Miel natural, dorada y cosechada con cuidado.',image:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=900&q=85'},
 {id:'3',name:'Aceite de oliva extra virgen',category:'Aceites',price:24,description:'Frutado y equilibrado, ideal para todos los días.',image:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=900&q=85',badge:'Nuevo'},
 {id:'4',name:'Harina de almendras',category:'Pastas y Harinas',price:12,description:'Una harina nutritiva para recetas simples y deliciosas.',image:'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=900&q=85'},
 {id:'5',name:'Pasta de maní natural',category:'Pastas y Harinas',price:11,description:'Cremosa, sin agregados y llena de energía.',image:'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=900&q=85'},
 {id:'6',name:'Aceite de coco virgen',category:'Aceites',price:16,description:'Versátil, suave y cuidadosamente prensado.',image:'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=900&q=85'}
];
