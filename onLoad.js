/**
 * 读取配置示例文件
 * 修改此文件来实现持久化
 * YL.init(data) 中的data必须是ylui接受的数据格式
 * 开发者可以自行决定从静态文件读取（如basic.json）还是从远程服务器拉取（如ajax请求）
 */

YL.onLoad(function () {
  // 读取url中load参数，如localhost/ylui/index.html?load=basic
  let load = Yuri2.parseURL().params.load;
  let file;
  // // 当load === 'ylui-storage'时，尝试加载浏览器缓存
  // if (load === YL.static.localStorageName && localStorage.getItem(YL.static.localStorageName)) {
  //   YL.init();
  //   return;
  // } else if (load === YL.static.localStorageName) {
  //   file = 'basic';
  // }

  // 首先查看是否登录
  const token = localStorage.getItem(YL.static.token)
  if (token) {
    // 尝试从本地拉取配置
    // const usr = JSON.parse(localStorage.getItem(YL.static.user))
    // if (usr && usr.save) {
    //   file = usr.save
    // }
    // 每次都从服务器拉取最新的数据，防止出现用户数据不是最新的情况
    // 本地拉取失败，尝试从网络拉取配置文件
    // else {
    getInfo()
        .then( res => {
          if (res.code === 0) {
            file = res.data.save
            localStorage.setItem(YL.static.user, JSON.stringify(res.data))
          }
    })
        .catch( err => {
          console.log('网络拉取配置文件失败，尝试使用基础配置文件启动系统。')
        })
    // }
  }


  // 从json文件读取
  if (file) {
    YL.init(JSON.parse(file))
  } else {
    file = './saves/basic.json'
    Yuri2.loadContentFromUrl(file, 'GET', function (err, text) {
      if (!err) {
        var data = JSON.parse(text);
        YL.init(data);
      } else {
        alert('YLUI读取配置错误，初始化失败');
      }
    });
  }

});
