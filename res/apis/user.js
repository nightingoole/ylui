function login(data) {
    data.grant_type = 'password'
    return service({
        url: '/usr-api/users/login',
        method: 'post',
        data
    })
}

function getInfo() {
    return service({
        url: '/usr-api/users/info',
        method: 'get'
    })
}

function logout() {
    return service({
        url: '/usr-api/users/logout',
        method: 'post'
    })
}

function registry(user) {
    return service({
        url: '/usr-api/users',
        method: 'post',
        params: user
    })
}

function uploadConfig(config) {
    return service({
        url: '/usr-api/users/save',
        method: 'put',
        data: { save: JSON.stringify(config) }
    })
}
