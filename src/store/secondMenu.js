export default {
    namespaced: true,
    state: {
        menuList: {}
    },
    mutations: {
        setmenuList(state, payload) {
            if (!state.menuList[payload.type]) {
                state.menuList[payload.type] = payload.list
            }

        }
    }
}