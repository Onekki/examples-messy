import Vue from 'vue'
import App from './App'
import './icon/index'
import router from "./router"
import store from './store'

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')


Vue.prototype.hasPerm = perm => {
    let perms = store.getters.gUserPerms
    return perms.indexOf(perm) > -1
}
