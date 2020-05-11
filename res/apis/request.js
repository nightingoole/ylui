// create an axios instance
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        const data = new URLSearchParams()
        if (config.data) {
            const old = config.data
            for (const prop in old) {
                data.append(prop, old[prop])
            }
            config.data = data
        }

        if (config.url.indexOf('/users/login') !== -1) {
            config.headers['ClientDetails'] = 'Basic YnJvd3NlcjoxOTk3OTg='
        }

        else if (localStorage.getItem('Authorization')) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            const token = localStorage.getItem('Authorization')
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        if (res.code !== 0) {
            if (res.code === 400 || res.code === 401 || res.code === 403) {
                // 身份认证异常，重新登录
                return Promise.reject(res)
            }
            return Promise.reject(new Error(res.msg))
        } else {

            return res
        }

    },

    error => {
        console.log('request error occurred: ', error)
        return Promise.reject(error)
    }

)
