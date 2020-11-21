import api from '@/api'
import { publicRoutes, needPermRoutes } from '@/router'

function hasPerm (permCodeList, route) {
  if (route.permCode) {
    return permCodeList.indexOf(route.permCode) > -1
  } else {
    return true
  }
}

function filterPermRoute (permRoute, permCodeList) {
  return permRoute.filter(route => {
    if (hasPerm(permCodeList, route)) {
      if (route.children && route.children.length) {
        route.children = filterPermRoute(route.children, permCodeList)
        return (route.children && route.children.length)
      }
      return true
    }
    return false
  })
}

const state = {
  sId: '',
  sNickname: '',
  sAvatarUrl: '',
  sRoles: [],
  sPermCodes: [],
  sRoutes: publicRoutes
}

const mutations = {
  mSetUser: (state, user) => {
    state.sId = user.id
    state.sNickname = user.nickname
    state.sAvatarUrl = user.avatarUrl
  },
  mResetUser: (state) => {
    state.sId = ''
    state.sNickname = ''
    state.sRoles = []
    state.sPermCodes = []
    state.sRoutes = publicRoutes
  },
  mSetUserPermCodes: (state, permCodeList) => {
    state.sPermCodes = permCodeList
  },
  mConcatRoutes: (state, routeMap) => {
    state.sRoutes = publicRoutes.concat(routeMap)
  }
}

const actions = {
  aLogin ({ commit }, loginModel) {
    return new Promise((resolve, reject) => {
      api.system.user.LOGIN(loginModel).then(data => {
        commit('mSetUser', data)
        api.system.SET_TOKEN(data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  aSetUser ({ commit }, user) {
    commit('mSetUser', JSON.parse(user))
  },
  aListUserPerm ({ commit }) {
    return new Promise((resolve, reject) => {
      api.system.perm.LIST_BY_SU().then(data => {
        if (data === null) return
        const permList = data
        let permCodeList = []
        for (const perm of permList) {
          permCodeList.push(perm.code)
        }
        commit('mSetUserPermCodes', permCodeList)
        const filteredRoutes = filterPermRoute(needPermRoutes, permCodeList)
        commit('mConcatRoutes', filteredRoutes)
        resolve(filteredRoutes)
      }).catch(error => [
        reject(error)
      ])
    })
  },
  aRemoveToken ({ commit }) {
    return new Promise(resolve => {
      commit('RESET_USER')
      api.system.REMOVE_TOKEN()
      resolve()
    })
  }
}

const getters = {
  gUserRoutes: state => state.sRoutes,
  gUserPermCodes: state => state.sPermCodes,
  gUserInfo: state => {
    return {
      id: state.sId,
      nickname: state.sNickname,
      avatarUrl: state.sAvatarUrl
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
