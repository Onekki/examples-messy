import remote from "@/repository/from/remote";

function USER_LOGIN(loginModel) {
    return remote({
                url: "/user/login",
                method: "post",
                params: loginModel
            })
}

function PERM_LIST_BY_SU() {
    return remote({
        url: "/perm/listBySU",
        method: "post"
    })
}

function USER_LIST(queryModel) {
    return remote({
        url: '/user/list',
        params: queryModel
    })
}

export default {
    USER_LOGIN,
    PERM_LIST_BY_SU,
    USER_LIST
}
