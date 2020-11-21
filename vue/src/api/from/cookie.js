import Cookies from 'js-cookie'

function set (key, value) {
  Cookies.set(key, value)
}

function get (key) {
  return Cookies.get(key)
}

function remove (key) {
  return Cookies.remove(key)
}

export default {
  set,
  get,
  remove
}
