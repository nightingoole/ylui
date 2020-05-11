YL.onReady(function () {

    console.log('onReady function')
    const token = localStorage.getItem(YL.static.token)
    if (token) {
        let usr = JSON.parse(localStorage.getItem(YL.static.user));
        getInfo(token).then( res => {
            usr = res.data
            localStorage.setItem(YL.static.user, JSON.stringify(usr))
            YL.import(JSON.parse(usr.save))
            YL.msg('系统提示', '欢迎回来，' + usr.username + '！')
        }).catch( err => {
            console.log('拉取用户文件出错: ', err)
            YL.util.simpleMsg('拉取用户文件出错', err)
            YL.open('ylui-login')
        })


    } else {
        YL.msg('系统提示', '您还未登陆，请先登录。')
        YL.open('ylui-login')
    }

});
