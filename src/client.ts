import type { Product } from './data';
export class ApiError extends Error { constructor(public readonly status:number, public readonly body:unknown){super('No se pudo completar la solicitud.');this.name='ApiError'} }
export type CheckoutRequest={submissionKey:string;customerName:string;customerSurname:string;paymentMethod:'cash'|'bank_transfer';deliveryMethod:'pickup'|'meeting_point';items:Array<{productId:string;quantity:number}>};
export type CheckoutResponse={orderReference?:string;total?:number;order?:{reference?:string;total?:number;items?:unknown[]};[key:string]:unknown};
export async function api<T>(path:string,options:RequestInit={}):Promise<T>{const r=await fetch(`/api${path.startsWith('/')?path:`/${path}`}`,{credentials:'same-origin',...options,headers:{...(options.body instanceof FormData?{}:{'Content-Type':'application/json'}),...(options.headers||{})}});const body=await r.json().catch(()=>undefined);if(!r.ok)throw new ApiError(r.status,body);return body as T}
const list=(body:unknown,key:string):any[]=>Array.isArray(body)?body:(body&&typeof body==='object'&&Array.isArray((body as any)[key])?(body as any)[key]:[]);
export function checkout(payload:CheckoutRequest){return api<CheckoutResponse>('/checkout',{method:'POST',body:JSON.stringify(payload)})}
type CatalogProduct={id?:string;productId?:string;categoryId?:string;categoryName?:string;name:string;description?:string;priceArs:number;imageUrl?:string;availability?:boolean|'available'|'unavailable'};
const normalizeProduct=(p:CatalogProduct, categoryName?:string):Product=>({id:String(p.id??p.productId),name:p.name,category:p.categoryName??categoryName??'Sin categoría',price:Number(p.priceArs),description:p.description??'',image:p.imageUrl??'',available:p.availability === true || p.availability === 'available'});
export async function getCatalog(){const body=await api<unknown>('/catalog');const source=body&&typeof body==='object'&&!Array.isArray(body)?body as {products?:CatalogProduct[];categories?:Array<{name?:string;categoryName?:string;products?:CatalogProduct[]}>}:{};if(Array.isArray(body))return body.flatMap((entry:unknown)=>{if(!entry||typeof entry!=='object')return [];const category=entry as {name?:string;categoryName?:string;products?:CatalogProduct[]};return (category.products??[]).map(p=>normalizeProduct(p,category.categoryName??category.name))});const products=source.products??[];if(products.length)return products.map(p=>normalizeProduct(p));return (source.categories??[]).flatMap(c=>(c.products??[]).map(p=>normalizeProduct(p,c.categoryName??c.name)))}
export const adminLogin=(p:{username:string;password:string})=>api('/admin/login',{method:'POST',body:JSON.stringify(p)});
export const adminSession=()=>api<Record<string,unknown>>('/admin/session'); export const adminLogout=()=>api('/admin/logout',{method:'POST'});
export const changePassword=(p:{currentPassword:string;newPassword:string})=>api('/admin/change-password',{method:'POST',body:JSON.stringify(p)});
export const getAdminCategories=async()=>list(await api<unknown>('/admin/categories'),'categories');
export const createCategory=(name:string)=>api('/admin/categories',{method:'POST',body:JSON.stringify({name})});
export const deleteCategory=(id:number|string)=>api(`/admin/categories/${id}`,{method:'DELETE'});
export const getAdminProducts=async()=>list(await api<unknown>('/admin/products'),'products');
export const createProduct=(p:unknown)=>api('/admin/products',{method:'POST',body:JSON.stringify(p)});
export const updateProduct=(id:number|string,p:unknown)=>api(`/admin/products/${id}`,{method:'PATCH',body:JSON.stringify(p)});
export const uploadMedia=(file:File)=>{const form=new FormData();form.append('file',file);return api<{url?:string;imageUrl?:string}>('/admin/media',{method:'POST',body:form})};
export const getAdminOrders=async()=>list(await api<unknown>('/admin/orders'),'orders');
export const updateOrderStatus=(orderId:number|string,status:string)=>api('/admin/orders/status',{method:'POST',body:JSON.stringify({orderId,status})});
