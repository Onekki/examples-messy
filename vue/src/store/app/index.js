const state = {
  sDrawerCollapse: true,
  sVisitedViews: []
}
const mutations = {
  mToggleDrawer: state => {
    state.sDrawerCollapse = !state.sDrawerCollapse
  }
}
const actions = {
  aToggleDrawer ({ commit }) {
    commit('mToggleDrawer')
  }
}
const getters = {
  gDrawerCollapse: state => state.sDrawerCollapse
}

export default {
  state,
  mutations,
  actions,
  getters
}
