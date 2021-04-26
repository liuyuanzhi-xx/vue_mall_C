import Vue from 'vue'
import Vuex from 'vuex'
import secondMenu from './secondMenu'
import shoppingCar from './shoppingCar'

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        secondMenu,
        shoppingCar
    },
    strict: true
})
export default store;