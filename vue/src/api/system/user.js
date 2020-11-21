import remote from '@/api/from/remote'

function LOGIN (loginModel) {
  return remote({
    url: '/system/user/login',
    method: 'post',
    params: loginModel
  })
}

function PAGE_VIEW (queryModel) {
  return remote({
    url: '/system/user/pageView',
    params: queryModel
  })
}

function SAVE (userModel) {
  return remote({
    url: '/system/user/save',
    method: 'post',
    data: userModel
  })
}

function UPDATE (userModel) {
  return remote({
    url: '/system/user/update',
    method: 'post',
    data: userModel
  })
}

function REMOVE (id) {
  return remote({
    url: '/system/user/remove',
    params: {
      'id': id
    }
  })
}

export default {
  LOGIN: LOGIN,
  PAGE_VIEW: PAGE_VIEW,
  SAVE: SAVE,
  UPDATE: UPDATE,
  REMOVE: REMOVE
}
