import remote from '@/api/from/remote'
import cookie from '@/api/from/cookie'
import perm from '@/api/system/perm'
import role from '@/api/system/role'
import user from '@/api/system/user'

function UPLOAD (formData) {
  return remote({
    url: '/upload',
    method: 'post',
    data: formData
  })
}

function GET_TOKEN () {
  return cookie.get('USER_TOKEN')
}

function SET_TOKEN (token) {
  return cookie.set('USER_TOKEN', token)
}

function REMOVE_TOKEN () {
  return cookie.remove('USER_TOKEN')
}

export default {
  UPLOAD: UPLOAD,
  GET_TOKEN: GET_TOKEN,
  SET_TOKEN: SET_TOKEN,
  REMOVE_TOKEN: REMOVE_TOKEN,
  user: user,
  role: role,
  perm: perm
}
