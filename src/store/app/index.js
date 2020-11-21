import Cookies from 'js-cookie';

const appStore = {
    state: {
        sSidebar: {
            sOpened: !+Cookies.get('sidebarStatus'),
        },
        sVisitedViews: []
    },
    mutations: {
        maToggleSidebar: state => {
            if (state.sSidebar.sOpened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
            state.sSidebar.sOpened = !state.sSidebar.sOpened
        },
        aAddVisitedView: (state, view) => {
            if (state.sVisitedViews.some(v => v.path === view.path))
                return state.sVisitedViews.push({ name: view.name, path: view.path })
        },
        aDelVisitedView: (state, view) => {
            let index
            for (const [i, v] of state.sVisitedViews.entries()) {
                if (v.path === view.path) {
                    index = i
                    break
                }
            }
            state.sVisitedViews.splice(index, 1)
        }
    },
    actions: {
        aToggleSidebar({ commit }) {
            commit('maToggleSidebar')
        }
    },
    getters: {
        gSidebar: state => state.sSidebar
    }
}

export default appStore
