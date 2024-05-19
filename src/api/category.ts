
import { CateType } from "@/type/category";
import instance from "./instance";


export const listCate = () => {
    const url = '/category'
    return instance.get(url);
}
export const listOneCate = (id: string) => {
    const url = `/category/${id}`
    return instance.get(url);
}
export const remove = (id: string) => {
    const url = `/category/${id}`
    return instance.delete(url)
}
export const addCate = (data: CateType) => {
    const url = '/category'
    return instance.post(url, data);
}
export const update = (data: CateType) => {
    const url = `/category/${data._id}`
    return instance.put(url, data);
}
// hàm load dữ liệu của cate để lấy tên
export const detailCategory = (id: any) => {
    const url = `/category/${id}`;
    return instance.get(url);
};

export const GetPrWithCategory = (id: string) => {
    const url = `/category/${id}?_embed=products`;
    return instance.get(url);
};