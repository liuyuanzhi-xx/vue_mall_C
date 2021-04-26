import request from "./request"
export async function getGoodsList(options) {
    return await request.get(`/getGoodsList`, {
        params: options
    })
}
export async function getGoodsListById(options) {
    return await request.get(`/getGoodsByIds`, {
        params: {
            value: options
        }
    })
}
export async function likeSearch(options) {
    return await request.get(`/likeSearch`, {
        params: options
    })
}
export async function search(options) {
    return await request.get(`/search`, {
        params: options
    })
}