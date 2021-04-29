import axios from 'axios'

const instance = axios.create({
    timeout: 5000
})

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        // do something before request is sent
        return config
    },
    (error) => {
        // do something with request error
        console.error(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
instance.interceptors.response.use(
    (response) => {
        const res = response.data

        return res.data
    },
    (error) => {
        console.error(error) // for debug
        return Promise.reject(error)
    }
)

export default instance.request