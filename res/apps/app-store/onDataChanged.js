const YL = parent.YL
YLApp.onReady(function () {

    YLApp.onEvent('dataChanged', function (e) {

        console.log('yl-app-store on data changed:', e)
        uploadConfig(YL.export()).then( res => {
            if (res.code === 0) {
                console.log('data upload success...')
            }
        }).catch( err => {
            YLApp.eval('simpleMsg', '数据上传出错，用户数据可能会丢失')
        })

    })

})
