import { ProductType } from "../type/Product";
import instance from "./instance";


export const getAll = () => {
    const url = "/products"
    return instance.get(url)
}
export const listOnePro = (id: string) => {
    const url = `/products/${id}`
    return instance.get(url);
}
export const remove = (id: string) => {
    const url = `/products/${id}`
    return instance.delete(url)
}
export const addPro = (data: ProductType) => {
    const url = "/products"
    return instance.post(url, data)
}
export const editPro = (data: ProductType) => {
    const url = `/products/${data.id}`
    return instance.put(url, data);
}

// hàm load sản phẩm theo danh mục trong trang chi tiết
export const similarProduct = (cateId: string) => {
    console.log('id',cateId);
    
    const url = `/products?cateId=${cateId}&_limit=5`;
    return instance.get(url);
};

// export const GetPrWithCategory = (id: string) => {
//     const url = `/category/${id}/products?_sort=createdAt&_order=desc`;
//     return instance.get(url);
// };