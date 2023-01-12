import axios from 'axios'

axios.defaults.baseURL = process.env.API_URL || 'http://127.0.0.1:5000/api/v1'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getClient = (baseUrl = null) => {
    const options = {
        baseURL: 'http://127.0.0.1:5000/api/v1',
        headers: {},
        params: {}
    }

    options.headers = {
    }

    options.params = {
    }

    const client = axios.create(options)

    // Add a request interceptor
    client.interceptors.request.use(async (config) => {
        return config
    },
        (requestError) => {
            return Promise.reject(requestError)
        },
    )

    // Add a response interceptor
    client.interceptors.response.use(
        (response: any) => response,
        (error) => {
            console.log(error)
            console.log('interceptors response: ', error.response)
            if (error.response.status >= 500) {
            }

            return Promise.reject(error)
        },
    )

    return client
}

class ApiClient {
    client: any

    constructor (baseUrl = null) {
        this.client = getClient(baseUrl)
    }

    get (url: any, conf = {}) {
        return this.client.get(url, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error))
    }

    delete (url: any, conf = {}) {
        return this.client.delete(url, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error))
    }

    head (url: any, conf = {}) {
        return this.client.head(url, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error))
    }

    options (url: any, conf = {}) {
        return this.client.options(url, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error))
    }

    post (url: any, data = {}, conf = {}) {
        return this.client.post(url, data, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error))
    }

    put (url: any, data = {}, conf = {}) {
        return this.client.put(url, data, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error))
    }

    patch (url: any, data = {}, conf = {}) {
        return this.client.patch(url, data, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error))
    }
}

export { ApiClient }

/**
 * Base HTTP Client
 */
const baseClient = {
    // Provide request methods with the default base_url
    get (url: any, conf = {}) {
        return getClient().get(url, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error))
    },

    delete (url: any, conf = {}) {
        return getClient().delete(url, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error))
    },

    head (url: any, conf = {}) {
        return getClient().head(url, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error))
    },

    options (url: any, conf = {}) {
        return getClient().options(url, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error))
    },

    post (url: any, data = {}, conf = {}) {
        return getClient().post(url, data, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error))
    },

    put (url: any, data = {}, conf = {}) {
        return getClient().put(url, data, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error))
    },

    patch (url: any, data = {}, conf = {}) {
        return getClient().patch(url, data, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error))
    },
}

export default baseClient