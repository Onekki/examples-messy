import Cookies from "js-cookie";

const HAS_LOGIN = 'HAS_LOGIN'

function hasLogin() {
    return Cookies.get(HAS_LOGIN)
}

function setLogin() {
    return Cookies.set(HAS_LOGIN, true)
}

function removeLoginStatus() {
    return Cookies.remove(HAS_LOGIN)
}

export default {
    hasLogin,
    setLogin,
    removeLoginStatus
}
