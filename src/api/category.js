import request from "./request"
import store from "@/store"
export async function getSidebar(type) {
    const list = store.state.secondMenu.menuList[type];
    if (!list) {
        let tempList = await request.get(`/getsidebar`, {
            params: {
                type
            }
        });
        store.commit('secondMenu/setmenuList', {
            type,
            list: tempList
        })
        return tempList
    } else {
        return list;
    }

    // return await request.get(`/getsidebar`, {
    //     params: {
    //         type
    //     }
    // });
}