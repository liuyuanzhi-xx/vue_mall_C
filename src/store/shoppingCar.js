import Vue from 'vue'
export default {
    namespaced: true,
    state: {
        countMap: {}
    },
    mutations: {
        setCountMap(state, {
            id,
            value
        }) {
            let count = state.countMap[id] || 0;
            count += value;
            if (count === 0) {
                Vue.delete(state.countMap, id)

            } else {
                Vue.set(state.countMap, id, count)

            }
            localStorage.shoppingCar = JSON.stringify(state.countMap)
        },
        initCountMap(state, payload) {

            state.countMap = payload;

        },
        deleteCountMapById(state, payload) {
            Vue.delete(state.countMap, payload)
        }
    }
}