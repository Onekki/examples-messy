import Cookies from 'js-cookie'

export function set(key, value) {
    Cookies.set(key, value)
}

export function get(key) {
    return Cookies.get(key)
}
