import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './user'
import appStore from "@/store/app";
import routeStore from "@/store/route";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        userStore,
        appStore,
        routeStore
    },
    getters: () => {
        return {
            sidebarGetters: appStore.getters,
            routeGetters: routeStore.getters,
            userGetters: userStore.getters
        }
    }
})

export default store
