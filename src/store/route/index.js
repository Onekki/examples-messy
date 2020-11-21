import { publicRouteMap, needPermRouteMap } from "@/router"

function hasPerm(permCodeList, route) {
    if (route.permCode) {
        return permCodeList.indexOf(route.permCode) > -1;
    } else {
        return true;
    }
}

function filterPermRoute(permRoute, perms) {
    return  permRoute.filter(route => {
        if (hasPerm(perms, route)) {
            if (route.children && route.children.length) {
                route.children = filterPermRoute(route.children, perms)
                return (route.children && route.children.length)
            }
            return true
        }
        return false
    })
}

const routeStore = {
    state: {
        sUserRouteMap: publicRouteMap,
        sAddRouteMap: []
    },
    mutations: {
        maSetRoutes: (state, routes) => {
            state.sAddRouteMap = routes
            state.sUserRouteMap = publicRouteMap.concat(routes)
            console.log("sUserRouteMap:", state.sUserRouteMap)
        }
    },
    actions: {
        aGenRoutes({commit}, permList) {
            return new Promise(resolve => {
                let permCodeList = []
                for (const perm of permList) {
                    permCodeList.push(perm.code)
                }
                const addRouteMap = filterPermRoute(needPermRouteMap, permCodeList)
                commit('maSetRoutes', addRouteMap)
                resolve()
            })
        }
    },
    getters: {
        gUserRouteMap: state => state.sUserRouteMap,
        gAddRouteMap: state => state.sAddRouteMap
    }
}
export default routeStore
