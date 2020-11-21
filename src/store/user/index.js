import repos from '@/repository'
import store from "@/store";
import router from "@/router";

const userStore = {
    state: {
        sId: 0,
        sNickname: "",
        sAvatar: "https://www.gravatar.com/avatar/6560ed55e62396e40b34aac1e5041028",
        sRoles: [],
        sPerms: []
    },
    mutations: {
        maSetUser: (state, user) => {
            state.sId = user.id;
            state.sNickname = user.nickname;
            state.sAvatar = user.avatar;
        },
        maResetUser: (state) => {
            state.sId = 0;
            state.sNickname = "";
            state.sRoles = [];
            state.sPerms = [];
        },
        maListUserPerm: (state, permList) => {
            state.sPerms = permList;
        }
    },
    actions: {
        aLogin({commit}, loginModel) {
            return new Promise((resolve, reject) => {
                repos.userRepo.USER_LOGIN(loginModel)
                    .then(data => {
                        commit('maSetUser', data.obj)
                        repos.appRepo.setLogin()
                        resolve(data);
                    }).catch(e => {
                        reject(e)
                    })
            })
        },
        aListUserPerm({commit}) {
            return new Promise((resolve, reject) => {
                repos.userRepo.PERM_LIST_BY_SU()
                    .then(data => {
                        const permList = data.obj;
                        commit('maListUserPerm', permList)
                        store.dispatch('aGenRoutes', permList).then(() => {
                            console.log("router1:", router)
                            console.log("getters1:", store.getters)
                            router.addRoutes(store.getters.gAddRouteMap)
                            console.log("router2:", router)
                        }).then(() => {
                            console.log("router3:", router)
                        })
                        resolve(data)
                    }).catch(error => {
                        reject(error)
                    })
            })
        }
    },
    getters: {
        gUserPerms: state => state.sPerms
    }
};
export default userStore
